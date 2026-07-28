import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Gallery from "./Gallery";
import Logo from "./Logo";
import PromotionalBanner from "./PromotionalBanner";
import { emptyImages } from "../data/catalogue";

export default function ProductDetails({ product, onBack }) {
  const variants = useMemo(() => {
    if (Array.isArray(product.variants) && product.variants.length) {
      return product.variants.map((variant) => ({
        ...variant,
        images: Object.fromEntries(
          Object.keys(emptyImages()).map((key) => [
            key,
            variant.images?.[key] || product.images?.[key] || "",
          ])
        ),
        etsyUrl: variant.etsyUrl || product.etsyUrl || "",
      }));
    }

    return [
      {
        name: "Medium",
        price: Number(product.price || 0),
        etsyUrl: product.etsyUrl || "",
        images: { ...emptyImages(), ...(product.images || {}) },
      },
    ];
  }, [product]);

  const [selectedVariantName, setSelectedVariantName] = useState(variants[0]?.name || "");

  useEffect(() => {
    setSelectedVariantName(variants[0]?.name || "");
  }, [product.id, variants]);

  const selectedVariant =
    variants.find((variant) => variant.name === selectedVariantName) || variants[0];

  const galleryProduct = {
    ...product,
    images: selectedVariant?.images || product.images,
    fallbackImages: product.images || {},
  };

  const price = Number(selectedVariant?.price || 0);
  const message = encodeURIComponent(
    `Hello Shiva Rudraksha Inc., I am interested in ${product.name} - ${selectedVariant?.name || ""} size (CAD $${price.toFixed(2)}). Please share availability, certificate and ordering details.`
  );

  return (
    <div className="details-page">
      <PromotionalBanner />
      <header className="detail-header">
        <div className="container detail-header-inner">
          <button onClick={onBack}><ArrowLeft /> Back to catalogue</button>
          <Logo compact />
        </div>
      </header>

      <main className="container details-layout">
        <Gallery product={galleryProduct} resetKey={selectedVariant?.name} />

        <section className="product-information">
          <span className="premium-label">{product.badge}</span>
          <h1>{product.name}</h1>

          <div className="information-grid">
            <span><MapPin /> Origin <strong>{product.origin}</strong></span>
            <span><Ruler /> Variants <strong>{variants.length} sizes</strong></span>
            <span><ShieldCheck /> Certificate <strong>Included</strong></span>
          </div>

          <p className="description">{product.description}</p>

          <div className="variant-selector">
            <label>Select bead size</label>
            <div className="variant-options" role="group" aria-label="Select bead size">
              {variants.map((variant) => {
                const isSelected = variant.name === selectedVariant?.name;
                return (
                  <button
                    key={variant.name}
                    type="button"
                    className={isSelected ? "selected" : ""}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedVariantName(variant.name)}
                  >
                    <span>{variant.name}</span>
                    <strong>CAD ${Number(variant.price || 0).toFixed(2)}</strong>
                  </button>
                );
              })}
            </div>
            <small>The gallery, certificate, X-ray, price and Etsy link change with the selected size.</small>
          </div>

          <div className="price-box">
            <small>{selectedVariant?.name} price in Canadian dollars</small>
            <strong>CAD ${price.toFixed(2)}</strong>
          </div>

          <div className="included-list">
            <span><CheckCircle2 /> Front view</span>
            <span><CheckCircle2 /> Back view</span>
            <span><CheckCircle2 /> Top view</span>
            <span><CheckCircle2 /> Bottom view</span>
            <span><CheckCircle2 /> Certificate</span>
            <span><CheckCircle2 /> X-ray</span>
          </div>

          <div className="product-action-buttons">
            <a
              className="whatsapp-button"
              href={`https://wa.me/14372671257?text=${message}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle /> Enquire on WhatsApp
            </a>

            {selectedVariant?.etsyUrl && (
              <a
                className="buy-button"
                href={selectedVariant.etsyUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ShoppingCart /> Buy Now
              </a>
            )}
          </div>

          <p className="disclaimer">
            Traditional spiritual descriptions are informational and are not
            medical or financial guarantees.
          </p>
        </section>
      </main>
    </div>
  );
}
