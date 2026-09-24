export const mapCategory = (category) => ({
  id: category._id,
  name: category.name,
  slug: category.slug,
  image: category.image,
  quantity: category.quantity,
});
