import { decodeWPChars, toProduct } from "../utils/convert";
import {
  fetchCategories,
  fetchImages,
  fetchProducts,
} from "../utils/fetchData";

export default defineEventHandler(async (event) => {
  try {
    const categories = await fetchCategories();
    const products = await fetchProducts();
    const productImages = await fetchImages(
      products.map((product) => product.featured_media)
    );

    const clientSideProducts = products.map((product) => {
      const productImage = productImages.find(
        (img) => img.id === product.featured_media
      );
      return toProduct(product, productImage?.source_url);
    });

    let groupedProducts = {} as groupedProductsType;
    clientSideProducts.forEach((project) => {
      project.categories.forEach((categoryId) => {
        const categoryName = decodeWPChars(
          categories.find((category) => category.id === categoryId)?.title
            .rendered || "Ismeretlen kategória"
        );
        if (!Object.keys(groupedProducts).includes(categoryName))
          groupedProducts[categoryName] = [];
        groupedProducts[categoryName]?.push(project);
      });
    });
    return groupedProducts;
  } catch (error) {
    console.error("Failed to fetch products: ", error);
    throw createError({ statusCode: 500 });
  }
});
