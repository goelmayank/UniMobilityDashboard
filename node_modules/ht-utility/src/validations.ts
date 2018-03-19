export const IsValidUrl = (url: string): boolean => {
  if (!url) return false;
  let urlRegex = /^https?\:\/\/[^\/\s]+(\/.*)?$/;
  let urlExpression = new RegExp(urlRegex);
  return urlExpression.test(url) || url == "";
};
