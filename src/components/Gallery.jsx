import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { IMAGE_SLOTS } from "../data/catalogue";

const REFERENCE_NOTICE = "Product photos and certificates are for reference only, not the exact item supplied. The actual bead, size, appearance and certificate may vary. Contact us for current photos and certification before ordering.";

export default function Gallery({ product, compact = false, onOpen, resetKey = "" }) {
  const images = useMemo(
    () =>
      IMAGE_SLOTS.map((slot) => ({
        ...slot,
        src: product.images?.[slot.key] || "",
        fallbackSrc: product.fallbackImages?.[slot.key] || "",
      })).filter((item) => item.src || item.fallbackSrc),
    [product]
  );

  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const startX = useRef(null);
  useEffect(() => {
    setIndex(0);
    setFullscreen(false);
  }, [resetKey]);

  const active = images[index] || images[0];
  const isDocument = (item) => ["certificate", "xray"].includes(item.key);
  const thumbnailGroups = [
    { title: "Product photos", items: images.filter((item) => !isDocument(item)) },
    { title: "Certificates & X-rays", items: images.filter(isDocument) },
  ];

  const useFallback = (event, fallbackSrc) => {
    if (!fallbackSrc || event.currentTarget.dataset.fallbackApplied === "true") return;
    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackSrc;
  };

  if (!active) return <div className="no-image">No image available</div>;

  const previous = () =>
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  const next = () =>
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1));

  const touchStart = (event) => {
    startX.current = event.changedTouches[0].clientX;
  };
  const touchEnd = (event) => {
    if (startX.current == null) return;
    const delta = event.changedTouches[0].clientX - startX.current;
    if (Math.abs(delta) > 45) delta > 0 ? previous() : next();
    startX.current = null;
  };

  if (compact) {
    return (
      <div className="card-gallery" onTouchStart={touchStart} onTouchEnd={touchEnd}>
        <button type="button" className="gallery-image-open" onClick={onOpen} aria-label={`View ${product.name}`}>
          <img
            src={active.src || active.fallbackSrc}
            onError={(event) => useFallback(event, active.fallbackSrc)}
            alt={`${product.name} ${active.label}`}
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
          />
        </button>
        {images.length > 1 && (
          <>
            <button
              className="gallery-button left" aria-label="Previous product image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                previous();
              }}
            >
              <ChevronLeft />
            </button>
            <button
              className="gallery-button right" aria-label="Next product image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight />
            </button>
          </>
        )}
        <span className="image-type">{active.label}</span>
        <span className="image-count">{index + 1}/{images.length}</span>
        <p className="card-reference-note" title={REFERENCE_NOTICE}>Reference photos & certificates • Actual item may vary</p>
      </div>
    );
  }

  return (
    <>
      <div className="detail-gallery">
        <div
          className="detail-main-image"
        >
          <div className="gallery-heading">
            <div>
              <p>{isDocument(active) ? "Certification reference" : "Product reference"}</p>
              <h2>{active.label}{!isDocument(active) ? " view" : ""}</h2>
            </div>
            <button type="button" className="gallery-view-full" onClick={() => setFullscreen(true)}>
              <Expand aria-hidden="true" /> View full size
            </button>
          </div>
          <div className="gallery-stage"
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
        >
          <img
            src={active.src || active.fallbackSrc}
            key={active.src || active.fallbackSrc}
            onError={(event) => useFallback(event, active.fallbackSrc)}
            alt={`${product.name} ${active.label}`}
            decoding="async"
            width="600"
            height="600"
          />
          <button className="gallery-button left" aria-label="Previous product image" onClick={previous}>
            <ChevronLeft />
          </button>
          <button className="gallery-button right" aria-label="Next product image" onClick={next}>
            <ChevronRight />
          </button>
          </div>
          <div className="gallery-reference-notice">
            <strong>Reference images only</strong>
            <p>{REFERENCE_NOTICE}</p>
          </div>
        </div>

        {thumbnailGroups.filter((group) => group.items.length).map((group) => (
        <section className="gallery-thumbnail-group" key={group.title} aria-label={group.title}>
          <h3>{group.title}</h3>
          <div className={`thumbnails ${group.title === "Product photos" ? "product-thumbnails" : "document-thumbnails"}`}>
          {group.items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === active.key ? "active" : ""}
              aria-label={`Show ${item.label.toLowerCase()} reference image`}
              aria-pressed={item.key === active.key}
              onClick={() => setIndex(images.indexOf(item))}
            >
              <img
                src={item.src || item.fallbackSrc}
                onError={(event) => useFallback(event, item.fallbackSrc)}
                alt={item.label}
                loading="lazy"
                decoding="async"
                width="64"
                height="64"
              />
              <span>{item.label}</span>
            </button>
          ))}
          </div>
        </section>
        ))}
      </div>

      {fullscreen && (
        <div className="fullscreen">
          <button className="close-fullscreen" aria-label="Close product image" onClick={() => setFullscreen(false)}>
            <X />
          </button>
          <button className="full-arrow left" aria-label="Previous reference image" onClick={previous}>
            <ChevronLeft />
          </button>
          <figure>
            <img src={active.src || active.fallbackSrc} onError={(event) => useFallback(event, active.fallbackSrc)} alt={`${product.name} ${active.label}`} />
            <figcaption>
              {product.name} — {active.label} ({index + 1}/{images.length})
              <p className="fullscreen-reference-note">{REFERENCE_NOTICE}</p>
            </figcaption>
          </figure>
          <button className="full-arrow right" aria-label="Next reference image" onClick={next}>
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
