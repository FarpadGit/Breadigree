import { toProduct } from "~~/server/utils/convert";
import { fetchImages, fetchProducts } from "~~/server/utils/fetchData";

export default defineEventHandler(async (event) => {
  try {
    const products = await fetchProducts();
    const featured = products.filter((p) => p.meta.featured);
    const productImages = await fetchImages(
      products.map((product) => product.featured_media)
    );

    const clientSideFeatured = featured.map((product) => {
      const productImage = productImages.find(
        (img) => img.id === product.featured_media
      );
      return toProduct(product, productImage?.source_url);
    });

    return clientSideFeatured;
  } catch (error) {
    console.error("Failed to fetch products: ", error);
    throw createError({ statusCode: 500 });
  }
});
