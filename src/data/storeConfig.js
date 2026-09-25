// Shiva Rudraksha <-> RudraSpirit E-Commerce Store Integration

/**
 * Resolves the base URL of the RudraSpirit E-Commerce Store.
 * In production (served from the same domain under /shivarudraksha/), defaults to window.location.origin.
 * In development, defaults to VITE_STORE_URL or current origin (fallback: http://localhost:8000).
 */
export const STORE_URL = (() => {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_STORE_URL) {
    return import.meta.env.VITE_STORE_URL.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined" && window.location) {
    // If running in Vite dev server (e.g. localhost:5173), point to local Laravel server
    if (window.location.port === "5173") {
      return "http://localhost:8000";
    }
    return window.location.origin;
  }
  return "";
})();

/**
 * Returns a full URL to any path on the RudraSpirit E-Commerce store.
 * @param {string} path - E.g. "/", "/cart", "/users/login", "/search"
 */
export function getStoreUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${STORE_URL}${normalized}`;
}

/**
 * Returns a direct purchase/view link for a product on the RudraSpirit store.
 * Routes through the /catalogue-buy/{identifier} smart resolver which automatically
 * locates the matching product in the database and redirects directly to its product page.
 * 
 * @param {Object} product - Catalogue product object
 * @param {Object} [variant] - Optional selected variant
 */
export function getStoreBuyUrl(product, variant = null) {
  if (!product) return getStoreUrl("/");

  // If live store URL was already discovered via API
  if (product.storeUrl) {
    return product.storeUrl;
  }

  // If mukhi is specified (1-21), use the mukhi resolver
  if (product.mukhi) {
    return getStoreUrl(`/catalogue-buy/${product.mukhi}-mukhi`);
  }

  // If id is specified (e.g. "1-mukhi-nepal-rudraksha", "ganesh-rudraksha")
  if (product.id) {
    return getStoreUrl(`/catalogue-buy/${encodeURIComponent(product.id)}`);
  }

  // Fallback to searching product name on the store
  return getStoreUrl(`/search?keyword=${encodeURIComponent(product.name || "rudraksha")}`);
}
