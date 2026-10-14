const CATEGORY_OPTIONS = [
  { label: "Smartphones", value: "smartphones", aliases: ["smartphone", "phone", "phones", "mobile", "mobiles"] },
  { label: "Laptop", value: "laptop", aliases: ["laptops", "notebook", "notebooks"] },
  { label: "Wearables", value: "wearables", aliases: ["wearable", "watch", "watches", "smartwatch", "smartwatches"] },
  { label: "Accessories", value: "accessories", aliases: ["accessory", "headphones", "headphone"] },
  { label: "Gaming", value: "gaming", aliases: ["games", "game"] },
  { label: "Audio", value: "audio", aliases: ["speaker", "speakers", "earbuds", "earphones"] },
];

const normalizeCategory = (category = "") =>
  String(category).trim().toLowerCase().replace(/[\s_-]+/g, "");

const getCategoryOption = (category) => {
  const normalized = normalizeCategory(category);

  return CATEGORY_OPTIONS.find(
    (option) =>
      normalizeCategory(option.value) === normalized ||
      normalizeCategory(option.label) === normalized ||
      option.aliases.some((alias) => normalizeCategory(alias) === normalized)
  );
};

const getCategoryLabel = (category) => {
  const option = getCategoryOption(category);
  return option ? option.label : String(category || "").trim();
};

module.exports = {
  CATEGORY_OPTIONS,
  getCategoryLabel,
  getCategoryOption,
};
