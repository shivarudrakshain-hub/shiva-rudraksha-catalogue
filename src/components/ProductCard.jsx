import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import Gallery from "./Gallery";

export default function ProductCard({ product, onOpen }) {
  const availablePrices = (product.variants || [])
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price) && price > 0);

  const startingPrice =
    availablePrices.length > 0
      ? Math.min(...availablePrices)
      : null;

  const isAvailable = startingPrice !== null;

  const message = encodeURIComponent(
    `Hello Shiva Rudraksha Inc., I am interested in ${product.name}. Please share size availability and ordering details.`
  );

  return (
    <article className="product-card">
      <button
        type="button"
        className="card-open"
        onClick={() => onOpen(product)}
      >
        <Gallery product={product} compact />
      </button>

      <div className="card-content">
        <div className="card-badges">
          <span>{product.badge}</span>
          <span>{isAvailable ? product.stockStatus : "Out of Stock"}</span>
        </div>

        <button
          type="button"
          className="product-name"
          onClick={() => onOpen(product)}
        >
          {product.name}
        </button>

        <p>{product.description}</p>

        <div className="card-meta">
          <span>
            <MapPin />
            {product.origin}
          </span>

          <span>
            <ShieldCheck />
            {product.certificateAvailable
              ? "Certificate included"
              : "No Certificate"}
          </span>
        </div>

        <div className="card-bottom">
          <div>
            {isAvailable ? (
              <>
                <small>From CAD</small>
                <strong>${startingPrice.toFixed(2)}</strong>
              </>
            ) : (
              <strong>Out of Stock</strong>
            )}
          </div>

          <button
            type="button"
            className="details-button"
            onClick={() => onOpen(product)}
          >
            View details
          </button>

          {isAvailable ? (
            <a
              href={`https://wa.me/14372671257?text=${message}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle />
              Enquire
            </a>
          ) : (
            <span className="card-unavailable">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </article>
  );
}