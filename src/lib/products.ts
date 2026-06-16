import { prisma } from "./db";

export type ProductWithCategory = Awaited<
  ReturnType<typeof getProductBySlug>
>;

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
}

export async function getProducts(opts: {
  category?: string;
  search?: string;
} = {}) {
  const { category, search } = opts;
  return prisma.product.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
      ...(search
        ? {
            OR: [
              { titleKa: { contains: search } },
              { descriptionKa: { contains: search } },
            ],
          }
        : {}),
    },
    include: { category: true },
    orderBy: [{ inStock: "desc" }, { sortOrder: "asc" }],
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 4
) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: excludeId } },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
}

// Admin helpers — products
export async function getAllProductsForAdmin() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

// Admin helpers — categories
export async function getAllCategoriesForAdmin() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}
