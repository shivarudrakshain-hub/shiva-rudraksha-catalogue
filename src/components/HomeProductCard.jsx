import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";
import "./HomeProductCard.css";

export default function HomeProductCard({ product, onOpen }) {
  const [photo, setPhoto] = useState(0);
  const [hoveringPhoto, setHoveringPhoto] = useState(false);
  const touchX = useRef(null);
  const { formatPrice } = useCurrency();
  const images = ["front", "back", "top", "bottom"].map((key) => ({
    key, src: product.images?.[key] || product.fallbackImages?.[key],
    fallback: product.fallbackImages?.[key],
  })).filter((item) => item.src);
  const active = images[photo] || images[0];
  useEffect(() => {
    if (!hoveringPhoto || images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setPhoto((current) => (current + 1) % images.length);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [hoveringPhoto, images.length]);
  const prices = (product.variants || []).map((v) => Number(v.price)).filter((p) => Number.isFinite(p) && p > 0);
  const startingPrice = prices.length ? Math.min(...prices) : Number(product.price || product.unit_price);
  const comingSoon = product.coming_soon || product.stockStatus === "Coming Soon";
  const priceText = comingSoon ? "Coming soon" : product.disable_price || !(startingPrice > 0) ? "Price on request" : `From ${formatPrice(startingPrice, product)}`;

  return (
    <article className="home-product-card" aria-label={product.name}>
      <div className="home-product-visual"
        onMouseEnter={() => { if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setHoveringPhoto(true); }}
        onMouseLeave={() => setHoveringPhoto(false)}
        onPointerCancel={() => setHoveringPhoto(false)}
        onTouchStart={(event) => { touchX.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => {
        if (touchX.current === null || !images.length) return;
        const delta = event.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 45) setPhoto((current) => (current + (delta < 0 ? 1 : images.length - 1)) % images.length);
        touchX.current = null;
      }}>
        <button className="home-product-photo" type="button" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          {active ? <img key={active.src} src={active.src} alt={`${product.name} — ${active.key} view`} width="420" height="420" loading="lazy" onError={(event) => {
            if (active.fallback && !event.currentTarget.dataset.usedFallback) {
              event.currentTarget.dataset.usedFallback = "true";
              event.currentTarget.src = active.fallback;
            }
          }} /> : <span>Photo available on request</span>}
        </button>
        <span className="home-product-origin">{product.origin || "Rudraksha"}</span>
        {images.length > 1 && <div className="home-photo-dots" role="group" aria-label={`Photo views for ${product.name}`}>
          {images.map((item, index) => <button type="button" key={item.key} aria-label={`Show ${item.key} view of ${product.name}`} aria-pressed={photo === index} onClick={() => setPhoto(index)}><span /></button>)}
        </div>}
      </div>
      <div className="home-product-caption">
        <h3><button type="button" onClick={() => onOpen(product)}>{product.name}</button></h3>
        <p>{priceText}</p>
        <button type="button" className="home-product-open" onClick={() => onOpen(product)}>View details <ArrowRight aria-hidden="true" /></button>
      </div>
      <div className="home-product-preview">
        <span className="home-preview-eyebrow">Explore this Rudraksha</span>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <ul>
          {product.origin && <li>Origin: {product.origin}</li>}
          {product.variants?.length > 0 && <li>Explore available sizes and options</li>}
          <li>{product.certificateAvailable ? "Certificate reference available" : "Ask us about verification"}</li>
        </ul>
        <span className="home-preview-trust"><ShieldCheck aria-hidden="true" /> Personal selection guidance</span>
        <strong>{priceText}</strong>
        <button type="button" onClick={() => onOpen(product)}>Explore product <ArrowRight aria-hidden="true" /></button>
      </div>
    </article>
  );
}
