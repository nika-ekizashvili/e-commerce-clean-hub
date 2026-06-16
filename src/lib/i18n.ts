// All user-facing Georgian strings live here so copy is easy to tweak.

export const t = {
  // Navigation
  navHome: "მთავარი",
  navProducts: "პროდუქცია",
  navAbout: "ჩვენ შესახებ",
  navContact: "კონტაქტი",

  // Home
  heroTitle: "სისუფთავე იწყება აქ",
  heroSubtitle:
    "დასუფთავებისა და საყოფაცხოვრებო საშუალებები თბილისში — ხარისხიანი პროდუქცია ხელმისაწვდომ ფასად.",
  heroCta: "ნახე პროდუქცია",
  featuredTitle: "რჩეული პროდუქცია",
  categoriesTitle: "კატეგორიები",
  viewAll: "ყველას ნახვა",

  // Catalog
  catalogTitle: "პროდუქცია",
  searchPlaceholder: "მოძებნე პროდუქტი...",
  allCategories: "ყველა კატეგორია",
  noProducts: "პროდუქტი ვერ მოიძებნა.",
  resultsCount: (n: number) => `${n} პროდუქტი`,

  // Product
  inStock: "მარაგშია",
  outOfStock: "არ არის მარაგში",
  specifications: "მახასიათებლები",
  description: "აღწერა",
  relatedTitle: "მსგავსი პროდუქცია",
  backToCatalog: "← უკან პროდუქციაში",

  // Order buttons
  orderCall: "დარეკე შესაკვეთად",
  orderSms: "SMS-ით შეკვეთა",
  orderHint: "შეუკვეთე ზარით ან SMS-ით",

  // About
  aboutTitle: "ჩვენ შესახებ",
  aboutBody:
    "Clean Hub არის თბილისური მაღაზია, რომელიც გთავაზობთ დასუფთავებისა და საყოფაცხოვრებო საშუალებების ფართო არჩევანს. ჩვენ ვზრუნავთ, რომ თქვენი სახლი, სამზარეულო და გარაჟი ყოველთვის სუფთა და მოწესრიგებული იყოს.",

  // Contact
  contactTitle: "კონტაქტი",
  contactPhone: "ტელეფონი",
  contactHours: "სამუშაო საათები",
  contactCity: "ქალაქი",
  contactFacebook: "Facebook გვერდი",
  contactCallNow: "დარეკვა",
  contactSmsNow: "SMS გაგზავნა",

  // Footer
  footerRights: "ყველა უფლება დაცულია",
  footerMadeIn: "თბილისი, საქართველო",

  // Admin
  adminTitle: "ადმინ პანელი",
  adminProducts: "პროდუქცია",
  adminAddProduct: "ახალი პროდუქტი",
  adminEdit: "რედაქტირება",
  adminDelete: "წაშლა",
  adminSave: "შენახვა",
  adminCancel: "გაუქმება",
  adminLogout: "გასვლა",
  adminLogin: "შესვლა",
  adminPassword: "პაროლი",
  adminLoginTitle: "ადმინისტრატორის შესვლა",
  adminWrongPassword: "არასწორი პაროლი",
  fieldTitle: "დასახელება",
  fieldCategory: "კატეგორია",
  fieldPrice: "ფასი (₾)",
  fieldDescription: "აღწერა",
  fieldSpecs: "მახასიათებლები (თითო ხაზზე)",
  fieldImageUrl: "სურათის ბმული (URL)",
  fieldInStock: "მარაგშია",
  fieldFeatured: "რჩეული (მთავარ გვერდზე)",
  confirmDelete: "დარწმუნებული ხართ, რომ გსურთ წაშლა?",
  confirmDeleteCategory:
    "კატეგორიის წაშლა წაშლის მის ყველა პროდუქტს. დარწმუნებული ხართ?",
  saved: "შენახულია",

  // Admin — categories
  adminCategories: "კატეგორიები",
  adminAddCategory: "ახალი კატეგორია",
  fieldEmoji: "ემოჯი (სიმბოლო)",
  fieldSortOrder: "რიგითობა",
  categoriesCount: (n: number) => `${n} კატეგორია`,
} as const;
