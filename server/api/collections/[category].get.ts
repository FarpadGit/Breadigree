import {
  fetchProducts,
  fetchCategoryBySlug,
  fetchImage,
  fetchImages,
} from "~~/server/utils/fetchData";

export default defineEventHandler(async (event) => {
  try {
    const categorySlug = getRouterParam(event, "category") ?? "";
    const category = await fetchCategoryBySlug(categorySlug);

    if (category.id == undefined)
      throw new Error(`category slug ${categorySlug} does not exist`);
    const categoryImage = await fetchImage(category.featured_media);

    const products = await fetchProducts();
    const productImages = await fetchImages(
      products.map((product) => product.featured_media)
    );
    const filteredProducts = products.filter((p) =>
      p.meta.categories.includes(category.id)
    );

    const clientSideProducts = filteredProducts.map((product) => {
      const productImage = productImages.find(
        (img) => img.id === product.featured_media
      );
      return toProduct(product, productImage?.source_url);
    });

    return {
      category: toCategory(category, categoryImage.source_url),
      products: clientSideProducts,
    };
  } catch (error) {
    console.error("Failed to fetch products: ", error);
    return null;
  }
});
