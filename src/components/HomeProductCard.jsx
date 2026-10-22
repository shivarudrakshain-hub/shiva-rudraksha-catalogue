import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";
import "./HomeProductCard.css";

export default function HomeProductCard({ product, guideEntry, onOpen }) {
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
  const shortName = product.mukhi ? `${product.mukhi} Mukhi` : product.name;
  const keyPoints = {
    1: ["Spiritual growth", "Inner peace", "Meditation"],
    3: ["Confidence", "Positive energy", "Letting go"],
    4: ["Learning", "Memory", "Creativity"],
    5: ["Peace", "Spiritual practice", "Meditation"],
    7: ["Prosperity", "Stability", "Positive opportunities"],
    12: ["Confidence", "Vitality", "Leadership"],
    14: ["Intuition", "Wisdom", "Clarity"],
  }[product.mukhi] || [product.origin || "Natural Rudraksha", "Explore available options", "Personal selection guidance"];

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
        <span className="home-product-label">{shortName}</span>
        {images.length > 1 && <div className="home-photo-dots" role="group" aria-label={`Photo views for ${product.name}`}>
          {images.map((item, index) => <button type="button" key={item.key} aria-label={`Show ${item.key} view of ${product.name}`} aria-pressed={photo === index} onClick={() => setPhoto(index)}><span /></button>)}
        </div>}
      </div>
      <div className="home-product-preview">
        <h4>{shortName}</h4>
        <ul aria-label="Traditional associations">
          {keyPoints.map((point) => <li key={point}>{point}</li>)}
        </ul>
        {(guideEntry?.deity || guideEntry?.nakshatra) && <dl className="home-preview-associations">
          {guideEntry.deity && <div><dt>Associated deity</dt><dd>{guideEntry.deity}</dd></div>}
          {guideEntry.nakshatra && <div><dt>Nakshatra</dt><dd>{guideEntry.nakshatra}</dd></div>}
        </dl>}
        <strong>{priceText}</strong>
        <button type="button" onClick={() => onOpen(product)}>Explore product <ArrowRight aria-hidden="true" /></button>
      </div>
    </article>
  );
}
