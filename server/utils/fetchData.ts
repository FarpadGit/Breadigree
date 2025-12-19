import { isWPError } from "./typeChecks";

const { serverEndpoint, productNS, categoryNS, galleryNS } = useRuntimeConfig();

export const fetchImages = defineCachedFunction(
  async (ids?: number[]) => await _fetchImages(ids),
  {
    maxAge: 3600,
    name: "fetchImages",
    getKey: (ids?: number[]) => ids?.toString() || "",
  }
);
export const fetchImage = defineCachedFunction(
  async (id: number) => await _fetchImage(id),
  { maxAge: 3600, name: "fetchImage", getKey: (id: number) => id.toString() }
);
export const fetchGallery = defineCachedFunction(
  async () => await _fetchGallery(),
  { maxAge: 3600, name: "fetchGallery" }
);
export const fetchProducts = defineCachedFunction(
  async () => await _fetchProducts(),
  { maxAge: 3600, name: "fetchProducts" }
);
export const fetchProduct = defineCachedFunction(
  async (id: number) => await _fetchProduct(id),
  { maxAge: 3600, name: "fetchProduct", getKey: (id: number) => id.toString() }
);
export const fetchCategories = defineCachedFunction(
  async () => await _fetchCategories(),
  { maxAge: 3600, name: "fetchCategories" }
);
export const fetchCategory = defineCachedFunction(
  async (id: number) => await _fetchCategory(id),
  { maxAge: 3600, name: "fetchCategory", getKey: (id: number) => id.toString() }
);
export const fetchCategoryBySlug = defineCachedFunction(
  async (slug: string) => await _fetchCategoryBySlug(slug),
  { maxAge: 3600, name: "fetchCategoryBySlug", getKey: (slug: string) => slug }
);
export const fetchPosts = defineCachedFunction(
  async () => await _fetchPosts(),
  { maxAge: 3600, name: "fetchPosts" }
);

async function _fetchImages(ids?: number[]) {
  let queryParam = "?per_page=100&orderby=date&order=asc";
  if (ids != undefined) ids.forEach((id) => (queryParam += `&include[]=${id}`));
  const serverSideImages: WPImageType[] = await fetch(
    serverEndpoint + "/media" + queryParam
  ).then((res) => res.json());
  return serverSideImages;
}

async function _fetchImage(id: number) {
  const serverSideImage: WPImageType | WPNotFound = await fetch(
    serverEndpoint + `/media/${id}`
  ).then((res) => res.json());
  if (isWPError(serverSideImage))
    return { source_url: "/logo.png" } as WPImageType;
  return serverSideImage;
}

async function _fetchGallery() {
  const serverSideGallery: WPGalleryType[] = await fetch(
    serverEndpoint + galleryNS + "?per_page=100&orderby=date&order=asc"
  ).then((res) => res.json());
  return serverSideGallery;
}

async function _fetchProducts() {
  const serverSideProducts: WPProductType[] = await fetch(
    serverEndpoint + productNS + "?per_page=100&orderby=date&order=asc"
  ).then((res) => res.json());
  return serverSideProducts;
}

async function _fetchProduct(id: number) {
  const serverSideProduct: WPProductType = await fetch(
    serverEndpoint + productNS + `/${id}`
  ).then((res) => res.json());
  return serverSideProduct;
}

async function _fetchCategories() {
  const serverSideCategories: WPCategoryType[] = await fetch(
    serverEndpoint + categoryNS + "?per_page=100&orderby=date&order=asc"
  ).then((res) => res.json());
  return serverSideCategories;
}

async function _fetchCategory(id: number) {
  const serverSideCategory: WPCategoryType = await fetch(
    serverEndpoint + categoryNS + `/${id}`
  ).then((res) => res.json());
  return serverSideCategory;
}

async function _fetchCategoryBySlug(slug: string) {
  const serverSideCategory: WPCategoryType = await fetch(
    serverEndpoint + categoryNS + `?slug=${slug}`
  )
    .then((res) => res.json())
    .then((res: any[]) => res[0]);
  return serverSideCategory;
}

async function _fetchPosts() {
  const serverSideArticles: WPPostType[] = await fetch(
    serverEndpoint + "/posts?orderby=date&per_page=100"
  ).then((res) => res.json());
  return serverSideArticles;
}
