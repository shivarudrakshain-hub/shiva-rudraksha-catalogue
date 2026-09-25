export const IMAGE_SLOTS = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "top", label: "Top" },
  { key: "bottom", label: "Bottom" },
  { key: "certificate", label: "Certificate" },
  { key: "xray", label: "X-ray" },
];

export const emptyImages = () => ({
  front: "",
  back: "",
  top: "",
  bottom: "",
  certificate: "",
  xray: "",
});

export function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

export function normalizeProduct(product) {
  const legacyImages = {
    ...emptyImages(),
    ...(product.images || {}),
    front: product.images?.front || product.image || "",
  };

  const variants =
    Array.isArray(product.variants) && product.variants.length
      ? product.variants.map((variant) => ({
          ...variant,
          images: {
            ...emptyImages(),
            ...(variant.images || {}),
          },
        }))
      : [];

  return {
    ...product,
    variants,
    images: legacyImages,
  };
}

export async function loadProducts() {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/products.json?t=${Date.now()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Unable to load product catalogue.");
  }

  const catalogueList = (await response.json()).map(normalizeProduct);

  // Attempt optional live store enrichment (non-blocking)
  try {
    const storeApi = await fetch(`/api/v2/catalogue/products`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);

    if (Array.isArray(storeApi) && storeApi.length) {
      const storeMap = new Map();
      storeApi.forEach((item) => {
        if (item.mukhi) storeMap.set(`mukhi-${item.mukhi}`, item);
        if (item.slug) storeMap.set(`slug-${item.slug}`, item);
      });

      return catalogueList.map((item) => {
        const live =
          (item.mukhi && storeMap.get(`mukhi-${item.mukhi}`)) ||
          storeMap.get(`slug-${item.id}`);

        if (live) {
          return {
            ...item,
            storeUrl: live.url,
            storeStock: live.stock,
            storePrice: live.price,
          };
        }
        return item;
      });
    }
  } catch (e) {
    // Graceful fallback to catalogue JSON
  }

  return catalogueList;
}