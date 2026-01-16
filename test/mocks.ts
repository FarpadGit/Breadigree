export const mockCategory: categoryType = {
  id: 0,
  name: "Mock Category",
  slug: "mock-category-slug",
  image: "mockImage.jpg",
};

export const mockProduct: productType = {
  id: 10,
  name: "Mock Product",
  slug: "mock-product-slug",
  description: "Mock Product Description",
  image: "mockImage.jpg",
  price: 1,
  featured: false,
  categories: [0],
};

export const mockFeaturedProduct: productType = {
  ...mockProduct,
  featured: 1,
};

export const mockProductList: productType[] = [
  mockProduct,
  { ...mockProduct, id: 11, slug: "mock-product-slug-2" },
  { ...mockProduct, id: 12, slug: "mock-product-slug-3" },
];

export const mockArticle: articleType = {
  id: 20,
  title: "Mock Article",
  slug: "mock-article-slug",
  body: "Mock Article Body",
  excerpt: "Mock Article Excerpt",
  featureImage: "mockImage.jpg",
  uploadDate: new Date("1970-01-01"),
};

export const mockServerArticle: serverArticleType = {
  ...mockArticle,
  uploadDate: "1970-01-01",
};

export const mockArticleList: articleType[] = [
  mockArticle,
  { ...mockArticle, id: 21, slug: "mock-article-slug-2" },
  { ...mockArticle, id: 22, slug: "mock-article-slug-3" },
];

export const mockWPCategory: WPCategoryType = {
  id: 0,
  title: { rendered: "Mock Category" },
  slug: "mock-category-slug",
  featured_media: 30,
  meta: {
    products: [1],
  },
};

export const mockWPProduct: WPProductType = {
  id: 10,
  title: { rendered: "Mock Product" },
  slug: "mock-product-slug",
  content: { rendered: "Mock Product Description" },
  featured_media: 30,
  meta: {
    price: "1",
    categories: [0],
    featured: "",
  },
};

export const mockFeaturedWPProduct: WPProductType = {
  ...mockWPProduct,
  meta: {
    ...mockWPProduct.meta,
    featured: "1",
  },
};

export const mockWPProductList: WPProductType[] = [
  mockWPProduct,
  { ...mockWPProduct, id: 11, slug: "mock-product-slug-2" },
  { ...mockWPProduct, id: 12, slug: "mock-product-slug-3" },
];

export const mockWPPost: WPPostType = {
  id: 20,
  title: { rendered: "Mock Article" },
  slug: "mock-article-slug",
  excerpt: { rendered: "Mock Article Excerpt" },
  content: { rendered: "Mock Article Body" },
  featured_media: 30,
  modified: "1970-01-01",
};

export const mockWPPostList: WPPostType[] = [
  mockWPPost,
  { ...mockWPPost, id: 21, slug: "mock-article-slug-2" },
  { ...mockWPPost, id: 22, slug: "mock-article-slug-3" },
];

export const mockWPImage: WPImageType = {
  id: 30,
  post: 20,
  source_url: "mockImage.jpg",
};

export const mockWPGallery: WPGalleryType = {
  id: 40,
  featured_media: 30,
};
