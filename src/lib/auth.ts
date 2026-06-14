import { cookies } from "next/headers";
import crypto from "crypto";

// Lightweight single-admin auth for v1.
// The owner logs in with a password (ADMIN_PASSWORD). We never store the
// password in the cookie — only an HMAC token derived from it.

const COOKIE = "ch_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "cleanhub";
}

function authSecret(): string {
  return process.env.AUTH_SECRET || "dev-insecure-secret-change-me";
}

// Token bound to the current password + secret. Changing either logs everyone out.
function expectedToken(): string {
  return crypto
    .createHmac("sha256", authSecret())
    .update(adminPassword())
    .digest("hex");
}

export function checkPassword(password: string): boolean {
  const a = Buffer.from(password);
  const b = Buffer.from(adminPassword());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function setSession(): void {
  cookies().set(COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export function clearSession(): void {
  cookies().delete(COOKIE);
}

export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  const expected = expectedToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
