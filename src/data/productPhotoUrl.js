// A stable version tag refreshes replaced photos without changing stored paths.
export function productPhotoUrl(src, slot) {
  if (!src || !['front', 'back', 'top', 'bottom', 'certificate', 'xray'].includes(slot) || !/(?:^|\/)images\/products\//.test(src)) return src;
  const hashAt = src.indexOf('#');
  const fragment = hashAt < 0 ? '' : src.slice(hashAt);
  const resource = hashAt < 0 ? src : src.slice(0, hashAt);
  const queryAt = resource.indexOf('?');
  const path = queryAt < 0 ? resource : resource.slice(0, queryAt);
  const params = new URLSearchParams(queryAt < 0 ? '' : resource.slice(queryAt + 1));
  params.set('product_bg', 'golden-v1');
  return `${path}?${params}${fragment}`;
}
