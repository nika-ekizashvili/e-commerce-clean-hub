"use client";

import { useRef, useState } from "react";

export default function ImageUpload({ defaultUrl = "" }: { defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setStatus("uploading");
    setErrorMsg("");
    try {
      // Step 1: get presigned URL from our server
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Server error ${res.status}`);
      }

      const { uploadUrl, publicUrl } = await res.json();

      // Step 2: PUT directly to S3
      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!put.ok) {
        const text = await put.text().catch(() => "");
        throw new Error(`S3 ${put.status}: ${text.slice(0, 200)}`);
      }

      setUrl(publicUrl);
      setStatus("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      console.error("[ImageUpload]", msg);
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-3">
      {/* Hidden field consumed by the server action */}
      <input type="hidden" name="imageUrl" value={url} />

      {/* Preview */}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="h-32 w-32 rounded-xl border border-slate-200 object-cover"
        />
      )}

      {/* File picker + status */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          {status === "uploading"
            ? "იტვირთება…"
            : url
            ? "სურათის შეცვლა"
            : "სურათის ატვირთვა"}
        </button>
        {status === "done" && (
          <span className="text-sm font-medium text-green-600">✓ ატვირთულია</span>
        )}
        {status === "error" && (
          <span className="max-w-xs text-sm font-medium text-red-600">
            ✗ შეცდომა: {errorMsg}
          </span>
        )}
      </div>

      {/* Manual URL fallback */}
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-xs text-slate-400">ან URL-ით:</span>
        <input
          type="url"
          placeholder="https://…"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setStatus("idle");
          }}
          className="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
