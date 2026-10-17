// Keep products without supplied photography out of the public catalogue.
export function isCatalogueProductVisible(product) {
  const mukhi = Number(product.mukhi);
  const identity = `${product.id || ''} ${product.slug || ''} ${product.name || ''}`;
  return mukhi !== 2 && !/(?:^|\s)2[-\s]*mukhi\b/i.test(identity);
}
