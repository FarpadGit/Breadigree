import { toArticle } from "../utils/convert";
import { fetchImages, fetchPosts } from "../utils/fetchData";

export default defineEventHandler(async (event) => {
  try {
    const serverSideArticles: WPPostType[] = await fetchPosts();
    const articleImages = await fetchImages(
      serverSideArticles.map((article) => article.featured_media)
    );

    const clientSideArticles = serverSideArticles.map((article) => {
      const articleImage = articleImages.find(
        (img) => img.id === article.featured_media
      );
      return toArticle(article, articleImage?.source_url || "/logo.png");
    });

    return clientSideArticles;
  } catch (error) {
    console.error("Failed to fetch articles: ", error);
    return [];
  }
});
