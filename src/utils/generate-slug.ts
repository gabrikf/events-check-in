export function generateSlug(title: string): string {
  // Convert title to lowercase and remove spaces
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug;
}
