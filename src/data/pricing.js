// Central catalogue policy: zero means price on request, not a free product.
export const PRICES_ON_REQUEST = true;
export const cataloguePrice = (value) => PRICES_ON_REQUEST ? 0 : Number(value || 0);
