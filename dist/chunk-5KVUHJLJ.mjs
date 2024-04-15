// src/utils/generate-slug.ts
function generateSlug(title) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug;
}

export {
  generateSlug
};
