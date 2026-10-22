import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import FAQChatbot from "./components/FAQChatbot";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Logo from "./components/Logo";
import HomeProductCard from "./components/HomeProductCard";
import PromotionalBanner from "./components/PromotionalBanner";
import HeroCarousel from "./components/HeroCarousel";
import Footer from "./components/Footer";

// Ultra-fast Code Splitting: Lazy-load non-initial route panels on demand
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Admin = lazy(() => import("./components/Admin"));
const BirthChartRecommendation = lazy(() => import("./components/BirthChartRecommendation"));
const RudrakshaKnowledge = lazy(() => import("./components/RudrakshaKnowledge"));
const RudrakshaMaintenance = lazy(() => import("./components/RudrakshaMaintenance"));
const LordShiva = lazy(() => import("./components/LordShiva"));
const FAQPage = lazy(() => import("./components/FAQPage"));
const CartDrawer = lazy(() => import("./components/CartDrawer"));
import { loadProducts } from "./data/catalogue";
import { getCartCount } from "./data/cartStore";
import { useCurrency } from "./context/CurrencyContext";

const categories = [
  "Nepal Rudraksha",
  "Indonesia Rudraksha",
  "Siddha Mala",
  "Gaurishankar",
  "Ganesh Rudraksha",
  "Rudraksha Combinations",
  "Bracelets & Malas",  
];


function GuideAccordionCard({ item }) {
  const [openSection, setOpenSection] = useState("description");
  const [activeGuideTab, setActiveGuideTab] = useState("benefits");

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? "" : section));
  };

  const AccordionButton = ({ section, label }) => {
    const isOpen = openSection === section;

    return (
      <button
        type="button"
        className={`guide-accordion-trigger ${isOpen ? "open" : ""}`}
        onClick={() => toggleSection(section)}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown />
      </button>
    );
  };

  return (
    <article className="guide-card detailed-guide-card" id={`mukhi-${item.mukhi || item.id}`}>
      <div className="guide-summary-grid">
        <div className="guide-summary-copy">
          
          <span className="guide-entry-type">
            {item.section === "special" ? "SPECIAL RUDRAKSHA FORM" : "SACRED RUDRAKSHA"}
          </span>
          <h2>{item.title || `${item.mukhi} Mukhi Rudraksha`}</h2>
          <p className="guide-benefits">{item.benefits}</p>
          {item.section !== "special" && <div className="guide-quick-facts">
            <div><span>Deity</span><strong>{item.deity}</strong></div>
            <div><span>Planet</span><strong>{item.planet}</strong></div>
            <div><span>Nakshatra</span><strong>{item.nakshatra}</strong></div>
            <div><span>Chakra</span><strong>{item.chakra}</strong></div>
            <div className="guide-quick-mantra"><span>Mantra</span><strong>{item.mantra}</strong></div>
          </div>}
        </div>

        <div className="guide-summary-image">
          <img
            src={`${import.meta.env.BASE_URL}images/products/${item.mukhi}-mukhi-nepal-rudraksha/top.avif`}
            alt={`${item.title || `${item.mukhi} Mukhi Rudraksha`} actual Rudraksha bead`}
            loading="lazy"
            decoding="async"
            width="180"
            height="180"
            onError={(event) => {
              const fallback =
                `${import.meta.env.BASE_URL}images/products/${item.mukhi}-mukhi-nepal-rudraksha/top.avif`;

              if (!event.currentTarget.dataset.fallbackUsed) {
                event.currentTarget.dataset.fallbackUsed = "true";
                event.currentTarget.src = fallback;
              }
            }}
          />
        </div>
      </div>

      {item.section !== "special" && (
        <div className="guide-premium-tabs">
          <div className="guide-premium-tabbar" role="tablist" aria-label={`${item.title} information`}>
            {[
              ["benefits", "Benefits"],
              ["description", "Description"],
              ["who", "Who Should Wear"],
              ["wearing", "Wearing Rules & Energization"]
            ].map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={activeGuideTab === key} className={activeGuideTab === key ? "active" : ""} onClick={() => setActiveGuideTab(key)}>{label}</button>
            ))}
          </div>
          <div className="guide-premium-panel" role="tabpanel">
            {activeGuideTab === "benefits" && <><h3>Key Benefits</h3><div className="guide-premium-benefits">{(item.benefitDetails || []).map((benefit) => <article key={benefit.title}><span aria-hidden="true">✦</span><div><h4>{benefit.title}</h4><p>{benefit.text}</p></div></article>)}</div></>}
            {activeGuideTab === "description" && <><h3>About {item.title}</h3><p>{item.about}</p><div className="guide-premium-specs"><div><span>Origin</span><strong>{item.origin}</strong></div><div><span>Deity</span><strong>{item.deity}</strong></div><div><span>Planet</span><strong>{item.planet}</strong></div><div><span>Mantra</span><strong>{item.mantra}</strong></div></div></>}
            {activeGuideTab === "who" && <><h3>Who Should Wear</h3><ul className="guide-list-content">{(item.whoShouldWear || []).map((line) => <li key={line}>{line}</li>)}</ul></>}
            {activeGuideTab === "wearing" && <><h3>Wearing Rules & Energization</h3><ul className="guide-list-content">{(item.wearingRules || []).map((line) => <li key={line}>{line}</li>)}</ul><div className="guide-mantra-callout"><span>Traditional mantra</span><strong>{item.mantra}</strong></div></>}
          </div>
        </div>
      )}
      {item.section === "special" && (
      <div className="guide-accordion">
        <div className="guide-accordion-item">
          <AccordionButton section="description" label="Description" />
          {openSection === "description" && (
            <div className="guide-accordion-content">
              <div className="guide-facts">
                <div><span>Presiding Deity</span><strong>{item.deity}</strong></div>
                <div><span>Ruling Planet</span><strong>{item.planet}</strong></div>
                <div><span>Beej / Wearing Mantra</span><strong>{item.mantra}</strong></div>
                <div><span>Origin</span><strong>{item.origin}</strong></div>
                <div><span>Nakshatra</span><strong>{item.nakshatra}</strong></div>
                <div><span>Chakra</span><strong>{item.chakra}</strong></div>
              </div>

              <div className="guide-about">
                <h3>About</h3>
                <p>{item.about}</p>
              </div>
            </div>
          )}
        </div>

        <div className="guide-accordion-item">
          <AccordionButton section="benefits" label="Benefits" />
          {openSection === "benefits" && (
            <div className="guide-accordion-content guide-benefit-sections">
              {(item.benefitDetails || []).map((benefit) => (
                <div key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="guide-accordion-item">
          <AccordionButton section="who" label="Who Should Wear" />
          {openSection === "who" && (
            <div className="guide-accordion-content">
              <ul className="guide-list-content">
                {(item.whoShouldWear || []).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="guide-accordion-item">
          <AccordionButton section="wearing" label="Wearing Rules & Energization" />
          {openSection === "wearing" && (
            <div className="guide-accordion-content">
              <ul className="guide-list-content">
                {(item.wearingRules || []).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="guide-mantra-callout">
                <span>Traditional mantra</span>
                <strong>{item.mantra}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </article>
  );
}

export default function App() {
  const { isAvailableForTenant } = useCurrency();
  const [route, setRoute] = useState(window.location.hash || "#home");
  const [products, setProducts] = useState([]);
  const [guide, setGuide] = useState([]);
  const [guideSearch, setGuideSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Nepal Rudraksha");
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount());

  const active = route.replace("#", "") || "home";

  useEffect(() => {
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  useEffect(() => {
    const listener = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);

  // Instant catalogue initialization
  useEffect(() => {
    loadProducts().then(setProducts).catch(console.error);
  }, []);

  // Share the documented associations between home cards and the Mukhi guide.
  useEffect(() => {
    if (guide.length > 0 || !["home", "guide"].includes(active)) return;
    fetch(`${import.meta.env.BASE_URL}data/rudraksha-guide.json`)
      .then((response) => response.json())
      .then(setGuide)
      .catch(console.error);
  }, [active, guide.length]);

  useEffect(() => {
    if (!route.startsWith("#product/")) return;
    const id = decodeURIComponent(route.substring("#product/".length));
    setSelected(
      products.find(
        (product) =>
          product.id === id ||
          product.slug === id ||
          String(product.db_id) === id ||
          (product.mukhi && id.startsWith(`${product.mukhi}-mukhi`))
      ) || null
    );
  }, [route, products]);

  const visible = useMemo(() => {
    return products.filter((product) => {
      if (!isAvailableForTenant(product)) return false;
      const matchesSearch = `${product.name} ${product.mukhi} ${product.origin}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" ||
        product.category === category ||
        (category === "Nepal Rudraksha" && product.origin === "Nepal");
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category, isAvailableForTenant]);

  const featuredProducts = useMemo(() => {
    if (!products || !products.length) return [];
    const available = products.filter(isAvailableForTenant);
    return [12, 14, 7].map((mukhi) => available.find((product) =>
      Number(product.mukhi) === mukhi || product.id === `${mukhi}-mukhi-nepal-rudraksha`
    )).filter(Boolean);
  }, [products, isAvailableForTenant]);

  const navigate = (hash) => {
    const target = hash === "#shop" ? "#home" : hash;
    window.location.hash = target;
    setRoute(target);
    setMobileOpen(false);
    setShopOpen(false);
    setKnowledgeOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProduct = (product) => {
    setSelected(product);
    navigate(`#product/${encodeURIComponent(product.id)}`);
  };

  if (route === "#admin") {
    return (
      <Suspense fallback={<div className="page-shell container"><p style={{ padding: "40px 0", textAlign: "center" }}>Loading Admin…</p></div>}>
        <Admin onBack={() => navigate("#home")} />
      </Suspense>
    );
  }

  if (route.startsWith("#product/") && selected) {
    return (
      <Suspense fallback={<div className="page-shell container"><p style={{ padding: "40px 0", textAlign: "center" }}>Loading Product Details…</p></div>}>
        <ProductDetails
          product={selected}
          allProducts={products}
          onOpenProduct={openProduct}
          onBack={() => navigate("#home")}
          onOpenCart={() => setIsCartOpen(true)}
        />
        {isCartOpen && (
          <Suspense fallback={null}>
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onNavigate={navigate}
            />
          </Suspense>
        )}
        <a
          className="floating-whatsapp"
          href="https://wa.me/14372671257"
          target="_blank"
          rel="noreferrer"
          title="WhatsApp Us"
          aria-label="Chat with Shiva Rudraksha Inc. on WhatsApp"
        >
          <MessageCircle />
          <span className="sr-only">Chat with Shiva Rudraksha Inc. on WhatsApp</span>
        </a>
        <Footer onNavigate={navigate} />
      </Suspense>
    );
  }

  return (
    <>
      <PromotionalBanner />
      <header className="luxury-header">
        <div className="luxury-nav container">
          <Logo />
          <button type="button" className="mobile-menu-button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <nav id="main-navigation" aria-label="Main navigation" className={mobileOpen ? "open" : ""} onKeyDown={(event) => { if (event.key === "Escape") { setMobileOpen(false); setKnowledgeOpen(false); document.querySelector(".mobile-menu-button")?.focus(); } }}>
            <button className={active === "home" ? "active" : ""} onClick={() => navigate("#home")}>Home</button>
            <div className="shop-menu knowledge-menu" onMouseEnter={() => { if (window.matchMedia("(min-width: 901px) and (hover: hover)").matches) setKnowledgeOpen(true); }} onMouseLeave={() => setKnowledgeOpen(false)}>
              <button
                type="button"
                className={["guide", "knowledge", "maintenance", "lord-shiva"].includes(active) ? "active" : ""}
                aria-expanded={knowledgeOpen}
                aria-haspopup="true"
                aria-controls="knowledge-navigation"
                onClick={() => setKnowledgeOpen((open) => !open)}
              >
                Rudraksha Knowledge <ChevronDown aria-hidden="true" />
              </button>
              <div
                id="knowledge-navigation"
                className="shop-dropdown knowledge-dropdown"
                hidden={!knowledgeOpen}
              >
                <button type="button" onClick={() => { navigate("#guide"); setKnowledgeOpen(false); }}>1–21 Mukhi Rudraksha Guide</button>
                <button type="button" onClick={() => { navigate("#lord-shiva"); setKnowledgeOpen(false); }}>Who is Lord Shiva?</button>
                <button type="button" onClick={() => { navigate("#maintenance"); setKnowledgeOpen(false); }}>Rudraksha Maintenance</button>
                <button type="button" onClick={() => { navigate("#knowledge"); setKnowledgeOpen(false); }}>Energizing & Do’s/Don’ts</button>
              </div>
            </div>
            <button className={active === "recommendations" ? "active" : ""} onClick={() => navigate("#recommendations")}>Recommendations</button>
            <button className={active === "about" ? "active" : ""} onClick={() => navigate("#about")}>About</button>
            <button className={active === "faq" ? "active" : ""} onClick={() => navigate("#faq")}>FAQ</button>
            <button className={active === "contact" ? "active" : ""} onClick={() => navigate("#contact")}>Contact</button>
            <a className="mobile-account-link" href="/profile">Account & Orders</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="Sacred Items Cart" aria-label={`Open cart (${cartCount} items)`}
            >
              <ShoppingBag size={18} />
              <span className="cart-btn-text">Cart</span>
              {cartCount > 0 && <span className="header-cart-badge">{cartCount}</span>}
            </button>

            <a
              href="/profile"
              className="header-account-btn"
              title="My Account & Orders"
            >
              <User size={18} />
              <span className="account-btn-text">Account</span>
            </a>
          </div>
        </div>
      </header>

      {active === "home" && (
        <main>
          {/* Full-Width Interactive Hero Carousel */}
          <HeroCarousel onNavigate={navigate} />

          <section className="home-featured container">
            <div className="home-featured-intro">
              <div className="section-kicker">FEATURED COLLECTION</div>
              <h2>Find your connection with Rudraksha</h2>
              <p>Explore our Nepal Rudraksha collection, view each bead from different angles, and find guidance for your selection.</p>
            </div>
            <div className="home-featured-grid">
              {featuredProducts.map((product) => (
                <HomeProductCard key={product.id} product={product} guideEntry={guide.find((entry) => Number(entry.mukhi) === Number(product.mukhi))} onOpen={openProduct} />
              ))}
            </div>
            <p className="home-featured-reference">Reference photos only. The actual bead, size and certificate may vary. Contact us for current photos before ordering.</p>
          </section>
        </main>
      )}

      {active === "guide" && (
        <main className="page-shell guide-page">
            <section className="guide-contact-style-hero" aria-labelledby="guide-title">
              <div className="guide-contact-style-copy">
                <span className="guide-hero-eyebrow">ॐ · SHIVA RUDRAKSHA INC. · SACRED KNOWLEDGE</span>
                <h1 id="guide-title">Discover the <em>1 to 21 Mukhi</em> Rudraksha Traditions</h1>
                <p>Explore each sacred bead's traditional deity, ruling planet, mantra, spiritual associations and wearing guidance.</p>
                <div className="guide-hero-features"><span>✦ 1–21 Mukhi</span><span>✦ Traditional wisdom</span><span>✦ Special formations</span></div>
              </div>
            </section>
          <div className="container guide-content">
            <div className="guide-discovery">
              <div className="guide-discovery-heading"><div><span>EXPLORE BY MUKHI</span><h2>Find your Rudraksha</h2></div><label className="guide-search-box"><Search size={19} /><input type="search" placeholder="Search deity, planet, mantra or Mukhi…" aria-label="Search Rudraksha guide" value={guideSearch} onChange={(event) => setGuideSearch(event.target.value)} />{guideSearch && <button type="button" aria-label="Clear guide search" onClick={() => setGuideSearch("")}><X size={16}/></button>}</label></div>
            </div>

            <section className="guide-section">

              <div className="guide-grid detailed-guide-grid">
                {guide
                  .filter((item) => item.section !== "special" && (!guideSearch.trim() || [item.title, item.mukhi, item.deity, item.planet, item.mantra, item.benefits, item.about].some((v) => String(v ?? "").toLowerCase().includes(guideSearch.trim().toLowerCase()))))
                  .map((item) => (
                    <GuideAccordionCard key={item.id || item.mukhi} item={item} />
                  ))}
              </div>
            </section>

            <section className="guide-section special-guide-section">
              <div className="guide-section-heading">
                <span>SPECIAL RUDRAKSHA FORMS</span>
                <h2>Rare & Naturally Formed Rudraksha</h2>
                <p>
                  Ganesh, Gauri Shankar, Trijuti, Garbh Gauri and 1 Mukhi Savaar
                  are special natural formations rather than additional Mukhi counts.
                </p>
              </div>

              <div className="guide-grid detailed-guide-grid">
                {guide
                  .filter((item) => item.section === "special" && (!guideSearch.trim() || [item.title, item.deity, item.planet, item.benefits, item.about].some((v) => String(v ?? "").toLowerCase().includes(guideSearch.trim().toLowerCase()))))
                  .map((item) => (
                    <GuideAccordionCard key={item.id} item={item} />
                  ))}
              </div>
            </section>

            <p className="tradition-note">
              Deity, planetary, nakshatra, chakra, mantra and wearing associations
              can differ among scriptures, lineages and teachers. These descriptions
              are provided as traditional spiritual information and are not medical,
              legal or financial advice.
            </p>
          </div>
        </main>
      )}


      {active === "knowledge" && (
        <Suspense fallback={<div className="page-shell container"><p style={{ padding: "40px 0", textAlign: "center" }}>Loading Knowledge…</p></div>}>
          <RudrakshaKnowledge />
        </Suspense>
      )}

      {active === "maintenance" && (
        <Suspense fallback={<div className="page-shell container"><p style={{ padding: "40px 0", textAlign: "center" }}>Loading Maintenance…</p></div>}>
          <RudrakshaMaintenance />
        </Suspense>
      )}

      {active === "lord-shiva" && (
        <Suspense fallback={<div className="page-shell container"><p style={{ padding: "40px 0", textAlign: "center" }}>Loading…</p></div>}>
          <LordShiva />
        </Suspense>
      )}

      {active === "recommendations" && (
        <main className="recommendation-page">
          <Suspense fallback={<div className="page-shell container"><p style={{ padding: "40px 0", textAlign: "center" }}>Loading Recommendations…</p></div>}>
            <BirthChartRecommendation />
          </Suspense>
        </main>
      )}

      {active === "about" && (
        <main className="premium-about-page">
          <section className="premium-about-hero">
            <div className="premium-about-intro">
  <div className="page-heading">
    <span>ABOUT SHIVA RUDRAKSHA</span>
    <h1>Every Rudraksha Has a Story. So Does Ours.</h1>
  </div>

  <p>
    At <strong>Shiva Rudraksha Inc.</strong>, we believe that every Rudraksha carries
    a unique spiritual significance, and choosing one should be a journey built on
    trust, authenticity, and transparency.
  </p>

  <p>
    Based in Canada, we carefully source authentic Rudraksha beads from trusted
    partners in Nepal and Indonesia. Every product on our website is presented
    with actual photographs of the exact bead you will receive—not stock images
    or AI-generated representations.
  </p>


            </div>
            <div className="premium-about-photo" role="img" aria-label="Lord Shiva against the Himalayan mountains" />
          </section>
          <section className="premium-about-details container">
  <h3>🌿 Our Mission</h3>

  <p>
    To make authentic Rudraksha accessible worldwide while providing honest
    guidance, transparent product information, and exceptional customer service
    before and after every purchase.
  </p>

  <h3>✨ Why Choose Shiva Rudraksha?</h3>

  <div className="about-features">

    <div className="about-card">
      <h4>📸 Actual Product Photography</h4>
      <p>
        Every Rudraksha displayed on our website is photographed individually.
        What you see is exactly what you receive.
      </p>
    </div>

    <div className="about-card">
      <h4>📜 Certificate & X-Ray</h4>
      <p>
        Wherever available, products include certification and X-ray verification
        for additional confidence and transparency.
      </p>
    </div>

    <div className="about-card">
      <h4>🌿 Authentic Sourcing</h4>
      <p>
        Our Rudraksha beads are sourced from trusted partners in Nepal and
        Indonesia and carefully inspected before listing.
      </p>
    </div>

    <div className="about-card">
      <h4>🧘 Personal Guidance</h4>
      <p>
        We are happy to recommend suitable Rudraksha based on your birth details,
        spiritual practices, and personal preferences.
      </p>
    </div>

    <div className="about-card">
      <h4>📿 Custom Mala Design</h4>
      <p>
        We create customized Rudraksha malas and bracelets according to your
        spiritual requirements.
      </p>
    </div>

    <div className="about-card">
      <h4>🌍 Worldwide Shipping</h4>
      <p>
        Secure shipping is available across Canada, the USA, and many countries
        around the world.
      </p>
    </div>

  </div>

  <h3>❤️ Our Promise</h3>

  <ul className="about-promise">
    <li>Authentic Rudraksha from trusted sources</li>
    <li>Actual product photographs</li>
    <li>Certificate & X-Ray wherever available</li>
    <li>Honest pricing with no hidden surprises</li>
    <li>Personalized customer guidance</li>
    <li>Secure worldwide delivery</li>
  </ul>

  <div className="about-quote">
    <h2>
      “We don't just sell Rudraksha.
      <br />
      We help preserve a tradition built on faith, authenticity, and trust.”
    </h2>
  </div>

  <h3>🙏 A Gentle Note</h3>

  <p>
    The spiritual significance and traditional benefits described on this website
    are based on Hindu scriptures and long-standing cultural traditions.
    Individual experiences may vary, and our products are not intended to
    diagnose, treat, cure, or prevent any medical condition.
  </p>


          </section>
        </main>
      )}

      {active === "faq" && (
        <Suspense fallback={<div className="page-shell container"><p>Loading FAQs…</p></div>}><FAQPage /></Suspense>
      )}

      {active === "contact" && (
        <main className="elegant-contact-page">
          <section className="elegant-contact-hero">
            <div className="elegant-contact-copy">
              <span className="elegant-contact-kicker">ॐ &nbsp; GET IN TOUCH</span>
              <h1>We reply <em>personally.</em></h1>
              <p>Message us and you will hear back from a person, not an auto-responder.</p>
              <div className="elegant-contact-grid">
                <a className="contact-whatsapp" href="https://wa.me/14372671257" target="_blank" rel="noreferrer"><span className="contact-icon"><MessageCircle /></span><span><small>WHATSAPP (FASTEST)</small><strong>Chat with us</strong><span className="contact-card-subtitle">Send us a message</span></span><span aria-hidden="true">›</span></a>
                <a href="tel:+14372671257"><span className="contact-icon">☎</span><span><small>CALL US</small><strong>+1 437-267-1257</strong></span><span aria-hidden="true">›</span></a>
                <a href="mailto:shivarudrakshain@gmail.com"><span className="contact-icon">✉</span><span><small>EMAIL US</small><strong>shivarudrakshain@gmail.com</strong></span><span aria-hidden="true">›</span></a>
                <div className="contact-location"><span className="contact-icon">⌖</span><span><small>OUR LOCATION</small><strong>Scarborough, Ontario, Canada</strong></span></div>
              </div>
            </div>
            <div className="elegant-contact-photo" role="img" aria-label="Lord Shiva devotional artwork with Rudraksha beads" />
          </section>
          <section className="elegant-contact-trust">
            <div><span className="trust-symbol">♧</span><span><strong>Worldwide Shipping</strong><p>Across Canada, the USA and internationally</p></span></div>
            <div><span className="trust-symbol">✧</span><span><strong>Authenticity &amp; Care</strong><p>Certificate and X-ray options where available</p></span></div>
            <div><span className="trust-symbol">ॐ</span><span><strong>Personal Guidance</strong><p>Rudraksha selection and custom combinations</p></span></div>
          </section>
          <div className="elegant-contact-footer">ॐ NAMAH SHIVAYA <span>·</span> SHIVA RUDRAKSHA INC.</div>
        </main>
      )}

      <FAQChatbot />

      {isCartOpen && (
        <Suspense fallback={null}>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onNavigate={navigate}
          />
        </Suspense>
      )}

      <Footer onNavigate={navigate} />
    </>
  );
}
