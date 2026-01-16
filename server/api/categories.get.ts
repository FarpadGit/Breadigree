import { toCategory } from "~~/server/utils/convert";
import { fetchImages, fetchCategories } from "~~/server/utils/fetchData";

export default defineEventHandler(async (event) => {
  try {
    const categories = await fetchCategories();
    const categoryImages = await fetchImages(
      categories.map((category) => category.featured_media)
    );

    const clientSideCategories = categories.map((category) => {
      const categoryImage = categoryImages.find(
        (img) => img.id === category.featured_media
      );
      return toCategory(category, categoryImage?.source_url);
    });

    return clientSideCategories;
  } catch (error) {
    console.error("Failed to fetch categories: ", error);
    throw createError({ statusCode: 500 });
  }
});
