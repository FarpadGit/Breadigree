export function isWPError(data: any | WPNotFound): data is WPNotFound {
  return data.data?.status === 404;
}
