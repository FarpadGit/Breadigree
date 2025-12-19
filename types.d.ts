type categoryType = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

type productType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  featured: false | number;
  categories: categoryType["id"][];
};

type groupedProductsType = { [key: categoryType["name"]]: productType[] };

type articleType = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featureImage: string;
  uploadDate: Date;
};

type serverArticleType = Omit<articleType, "uploadDate"> & {
  uploadDate: string;
};

type WPPostType = {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  modified: string;
};

type WPProductType = {
  id: number;
  title: { rendered: string };
  slug: string;
  content: { rendered: string };
  featured_media: number;
  meta: {
    price: string;
    categories: number[];
    featured: string;
  };
};

type WPCategoryType = {
  id: number;
  title: { rendered: string };
  slug: string;
  featured_media: number;
  meta: {
    products: number[];
  };
};

type WPImageType = {
  id: number;
  post: number;
  source_url: string;
};

type WPGalleryType = {
  id: number;
  featured_media: number;
};

type WPNotFound = {
  data: { status: 404 };
};
