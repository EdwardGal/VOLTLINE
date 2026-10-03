export const filterProducts = (
  products,
  { selectedCategories, filterParams, conditions, priceRange }
) =>
  products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    if (filterParams && !product.tags.includes(filterParams.toLowerCase())) {
      return false;
    }

    if (conditions.inStock && product.quantity <= 0) {
      return false;
    }

    if (conditions.onSale && (!product.discount || product.discount <= 0)) {
      return false;
    }

    const productPrice =
      product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    if (productPrice < priceRange.min || productPrice > priceRange.max) {
      return false;
    }

    return true;
  });
