import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Categories requested by the owner.
const categories = [
  { slug: "household", nameKa: "საყოფაცხოვრებო", emoji: "🧹", sortOrder: 1 },
  { slug: "kitchen", nameKa: "სამზარეულო", emoji: "🍽️", sortOrder: 2 },
  { slug: "garage", nameKa: "გარაჟი", emoji: "🚗", sortOrder: 3 },
];

// A starter catalog so the store doesn't look empty. The owner can edit /
// delete these from the admin panel. Images use Unsplash placeholders.
const products = [
  {
    slug: "soap-150g",
    titleKa: "საპონი 150გ",
    descriptionKa:
      "ხელის ნატურალური საპონი დელიკატური სურნელით. ნაზია კანის მიმართ და ეფექტურად ასუფთავებს.",
    specsKa: "წონა: 150გ\nტიპი: ხელის საპონი\nსურნელი: ნეიტრალური",
    price: 20,
    categorySlug: "household",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80",
  },
  {
    slug: "dish-soap-500ml",
    titleKa: "ჭურჭლის სარეცხი საშუალება 500მლ",
    descriptionKa:
      "კონცენტრირებული გელი ჭურჭლის სარეცხად. ადვილად აშორებს ცხიმს და არ აშრობს ხელებს.",
    specsKa: "მოცულობა: 500მლ\nსურნელი: ლიმონი",
    price: 8.5,
    categorySlug: "kitchen",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80",
  },
  {
    slug: "floor-cleaner-1l",
    titleKa: "იატაკის სარეცხი საშუალება 1ლ",
    descriptionKa:
      "უნივერსალური საშუალება ყველა ტიპის იატაკისთვის. ტოვებს სასიამოვნო სიახლის სურნელს.",
    specsKa: "მოცულობა: 1ლ\nგამოყენება: ყველა ტიპის იატაკი",
    price: 12,
    categorySlug: "household",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
  },
  {
    slug: "microfiber-cloth-set",
    titleKa: "მიკროფიბერის ნაჭრების ნაკრები (5ც)",
    descriptionKa:
      "მრავალჯერადი მიკროფიბერის ნაჭრები ზედაპირების გასაწმენდად. არ ტოვებს ღარიბებს.",
    specsKa: "რაოდენობა: 5 ცალი\nმასალა: მიკროფიბერი",
    price: 15,
    categorySlug: "household",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    slug: "sponge-pack",
    titleKa: "სამზარეულოს ღრუბლები (10ც)",
    descriptionKa:
      "ხარისხიანი ღრუბლები ჭურჭლისა და ზედაპირების გასაწმენდად. გამძლე და მოსახერხებელი.",
    specsKa: "რაოდენობა: 10 ცალი",
    price: 6,
    categorySlug: "kitchen",
    imageUrl:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80",
  },
  {
    slug: "trash-bags-30l",
    titleKa: "ნაგვის პარკები 30ლ (30ც)",
    descriptionKa:
      "გამძლე ნაგვის პარკები ყოველდღიური გამოყენებისთვის. არ იხევა.",
    specsKa: "მოცულობა: 30ლ\nრაოდენობა: 30 ცალი",
    price: 9,
    categorySlug: "kitchen",
    imageUrl:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&q=80",
  },
  {
    slug: "rubber-gloves",
    titleKa: "სამეურნეო ხელთათმანები",
    descriptionKa:
      "რეზინის გამძლე ხელთათმანები დასუფთავებისთვის. იცავს ხელებს ქიმიური საშუალებებისგან.",
    specsKa: "ზომა: M/L\nმასალა: ლატექსი",
    price: 5,
    categorySlug: "household",
    imageUrl:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
  },
  {
    slug: "car-wash-shampoo-1l",
    titleKa: "ავტომობილის სარეცხი შამპუნი 1ლ",
    descriptionKa:
      "კონცენტრირებული შამპუნი მანქანის გარეცხვისთვის. ქმნის უხვ ქაფს და იცავს საღებავს.",
    specsKa: "მოცულობა: 1ლ\nგამოყენება: ავტომობილის ძარა",
    price: 14,
    categorySlug: "garage",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80",
  },
  {
    slug: "degreaser-spray",
    titleKa: "გამაუცხიმოვებელი სპრეი 500მლ",
    descriptionKa:
      "ძლიერი საშუალება გარაჟისა და სახელოსნოს ცხიმიანი ზედაპირებისთვის.",
    specsKa: "მოცულობა: 500მლ\nტიპი: სპრეი",
    price: 11,
    categorySlug: "garage",
    imageUrl:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
  },
];

async function main() {
  console.log("🌱 Seeding Clean Hub…");

  const categoryIdBySlug: Record<string, string> = {};
  for (const c of categories) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameKa: c.nameKa, emoji: c.emoji, sortOrder: c.sortOrder },
      create: c,
    });
    categoryIdBySlug[c.slug] = row.id;
  }

  let order = 0;
  for (const p of products) {
    const { categorySlug, ...rest } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        ...rest,
        sortOrder: order,
        categoryId: categoryIdBySlug[categorySlug],
      },
      create: {
        ...rest,
        sortOrder: order,
        categoryId: categoryIdBySlug[categorySlug],
      },
    });
    order++;
  }

  console.log(
    `✅ Done: ${categories.length} categories, ${products.length} products.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
