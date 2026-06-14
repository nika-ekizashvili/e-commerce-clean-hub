"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/format";
import {
  checkPassword,
  setSession,
  clearSession,
  isAuthenticated,
} from "@/lib/auth";

function requireAuth() {
  if (!isAuthenticated()) redirect("/admin/login");
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  setSession();
  redirect("/admin");
}

export async function logout() {
  clearSession();
  redirect("/admin/login");
}

const productSchema = z.object({
  titleKa: z.string().trim().min(1),
  categoryId: z.string().trim().min(1),
  price: z.coerce.number().min(0),
  descriptionKa: z.string().trim().default(""),
  specsKa: z.string().trim().default(""),
  imageUrl: z.string().trim().default(""),
  inStock: z.boolean().default(false),
  featured: z.boolean().default(false),
});

function parseForm(formData: FormData) {
  return productSchema.parse({
    titleKa: formData.get("titleKa"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    descriptionKa: formData.get("descriptionKa") ?? "",
    specsKa: formData.get("specsKa") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    inStock: formData.get("inStock") === "on",
    featured: formData.get("featured") === "on",
  });
}

export async function createProduct(formData: FormData) {
  requireAuth();
  const data = parseForm(formData);
  await prisma.product.create({
    data: { ...data, slug: slugify(data.titleKa) },
  });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id: string, formData: FormData) {
  requireAuth();
  const data = parseForm(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  requireAuth();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin");
  }
}
