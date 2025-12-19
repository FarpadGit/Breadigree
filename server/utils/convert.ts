export function toCategory(
  WPData: WPCategoryType,
  imageUrl: string = ""
): categoryType {
  return {
    id: WPData.id,
    name: decodeWPChars(WPData.title.rendered),
    slug: WPData.slug,
    image: imageUrl,
  };
}

export function toProduct(
  WPData: WPProductType,
  imageUrl: string = ""
): productType {
  const featured = WPData.meta.featured;
  return {
    id: WPData.id,
    name: decodeWPChars(WPData.title.rendered),
    slug: WPData.slug,
    description: WPData.content.rendered,
    price: +WPData.meta.price,
    image: imageUrl,
    categories: WPData.meta.categories,
    featured: featured === "" ? false : +featured,
  };
}

export function toArticle(
  WPData: WPPostType,
  imageUrl: string = ""
): serverArticleType {
  return {
    id: WPData.id,
    title: decodeWPChars(WPData.title.rendered),
    slug: WPData.slug,
    excerpt: WPData.excerpt.rendered,
    body: WPData.content.rendered,
    featureImage: imageUrl,
    uploadDate: WPData.modified,
  };
}

export function decodeWPChars(input: string) {
  const decodeTable = [
    { from: "&#038;", to: "&" },
    { from: "&#8220;", to: '"' },
    { from: "&#8221;", to: "”" },
    { from: "&#8222;", to: "„" },
  ];
  let decodedInput = input;
  decodeTable.forEach(
    (item) => (decodedInput = decodedInput.replace(item.from, item.to))
  );

  return decodedInput;
}
