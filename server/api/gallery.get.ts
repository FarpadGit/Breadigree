import { fetchGallery, fetchImages } from "~~/server/utils/fetchData";

export default defineEventHandler(async (event) => {
  try {
    const serverSideGallery: WPGalleryType[] = await fetchGallery();

    const galleryImages = await fetchImages(
      serverSideGallery.map((image) => image.featured_media)
    );

    return galleryImages.map((image) => image.source_url);
  } catch (error) {
    console.error("Failed to fetch gallery images: ", error);
    throw createError({ statusCode: 500 });
  }
});
