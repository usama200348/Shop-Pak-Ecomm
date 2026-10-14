import {
  FaGamepad,
  FaHeadphones,
  FaLaptop,
  FaMicrophoneAlt,
  FaMobileAlt,
  FaStopwatch,
} from "react-icons/fa";

export const CATEGORY_OPTIONS = [
  {
    name: "Smartphones",
    slug: "smartphones",
    value: "Smartphones",
    icon: FaMobileAlt,
    color: "from-green-500 to-green-700",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    aliases: ["smartphone", "phone", "phones", "mobile", "mobiles"],
  },
  {
    name: "Laptops",
    slug: "laptop",
    value: "Laptop",
    icon: FaLaptop,
    color: "from-blue-500 to-blue-700",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    aliases: ["laptops", "notebook", "notebooks"],
  },
  {
    name: "Watches",
    slug: "wearables",
    value: "Wearables",
    icon: FaStopwatch,
    color: "from-purple-500 to-purple-700",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    aliases: ["wearable", "watch", "watches", "smartwatch", "smartwatches"],
  },
  {
    name: "Accessories",
    slug: "accessories",
    value: "Accessories",
    icon: FaHeadphones,
    color: "from-orange-500 to-orange-700",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    aliases: ["accessory", "headphones", "headphone"],
  },
  {
    name: "Gaming",
    slug: "gaming",
    value: "Gaming",
    icon: FaGamepad,
    color: "from-rose-500 to-red-700",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    aliases: ["games", "game"],
  },
  {
    name: "Audio",
    slug: "audio",
    value: "Audio",
    icon: FaMicrophoneAlt,
    color: "from-cyan-500 to-sky-700",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
    aliases: ["speaker", "speakers", "earbuds", "earphones"],
  },
];

export const normalizeCategory = (category = "") =>
  String(category).trim().toLowerCase().replace(/[\s_-]+/g, "");

export const getCategoryOption = (category) => {
  const normalized = normalizeCategory(category);

  return CATEGORY_OPTIONS.find(
    (option) =>
      normalizeCategory(option.slug) === normalized ||
      normalizeCategory(option.value) === normalized ||
      normalizeCategory(option.name) === normalized ||
      option.aliases.some((alias) => normalizeCategory(alias) === normalized)
  );
};

export const getCategoryLabel = (category) => {
  const option = getCategoryOption(category);
  return option?.value || String(category || "").trim();
};

export const categoryMatches = (productCategory, selectedCategory) => {
  const selected = getCategoryOption(selectedCategory);
  const product = getCategoryOption(productCategory);

  if (selected && product) {
    return selected.slug === product.slug;
  }

  return normalizeCategory(productCategory) === normalizeCategory(selectedCategory);
};
