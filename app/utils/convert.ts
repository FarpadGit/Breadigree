export function toArticles(serverPayload: serverArticleType[]) {
  return serverPayload.map(
    (article) =>
      ({ ...article, uploadDate: new Date(article.uploadDate) } as articleType)
  );
}
