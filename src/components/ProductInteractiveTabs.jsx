import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  Scan,
  Compass,
} from "lucide-react";
import ProductSpiritualGuide from "./ProductSpiritualGuide";

export default function ProductInteractiveTabs({ product }) {
  const [activeTab, setActiveTab] = useState("guide");

  const sampleReportBase = `${import.meta.env.BASE_URL}images/products/1-mukhi-nepal-rudraksha`;

  const tabs = [
    { id: "guide", label: "Spiritual Guide & Vedic Vidhi", icon: BookOpen },
    { id: "energization", label: "Prana Pratishtha Vidhi", icon: Sparkles },
    { id: "authenticity", label: "Lab Certificate & X-Ray", icon: ShieldCheck },
    { id: "wearing", label: "How to Wear & Maintain", icon: Compass },
    { id: "faq", label: "Frequently Asked Questions", icon: HelpCircle },
  ];

  return (
    <section className="product-interactive-tabs-section">
      <div className="container">
        {/* Animated Pill Tab Switcher */}
        <div className="product-tabs-bar" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`product-tab-pill ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display with Smooth Transitions */}
        <div className="product-tab-panel">
          {/* TAB 1: Spiritual Guide */}
          {activeTab === "guide" && (
            <div className="tab-pane-content fade-in">
              <ProductSpiritualGuide product={product} />
            </div>
          )}

          {/* TAB 2: Sacred Energization */}
          {activeTab === "energization" && (
            <div className="tab-pane-content fade-in energization-panel">
              <div className="tab-panel-header">
                <span className="panel-kicker">CONSECRATION VIDHI</span>
                <h3>Vedic Prana Pratishtha Process</h3>
                <p>
                  Every Rudraksha dispatched by Shiva Rudraksha Inc. undergoes rigorous authentic Vedic energization performed by experienced Himalayan priests.
                </p>
              </div>

              <div className="energization-steps-grid">
                <div className="energize-step-card">
                  <div className="step-number-bubble">01</div>
                  <h4>Gangajal & Panchamrit Snan</h4>
                  <p>
                    Purified with consecrated water from the Holy Ganga, unboiled cow milk, curd, honey, ghee, and holy basil to cleanse any latent environmental vibrations.
                  </p>
                </div>

                <div className="energize-step-card">
                  <div className="step-number-bubble">02</div>
                  <h4>Sandalwood & Bilva Patra</h4>
                  <p>
                    Anointed with natural Kashmiri sandalwood paste and fresh Bilva leaves, invoking Lord Shiva’s eternal benevolence and supreme consciousness.
                  </p>
                </div>

                <div className="energize-step-card">
                  <div className="step-number-bubble">03</div>
                  <h4>108 Moola Mantra Japa</h4>
                  <p>
                    Consecrated with 108 deliberate recitations of the presiding deity's sacred Vedic Beej Mantra, activating the natural electromagnetic resonance of the bead.
                  </p>
                </div>

                <div className="energize-step-card">
                  <div className="step-number-bubble">04</div>
                  <h4>Copper Yantra Sealing</h4>
                  <p>
                    Resting on an energized Sri Yantra or Shiva Yantra, then sealed in sterile sacred red silk cloth ready to grace the devotee.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Authenticity & Lab Testing */}
          {activeTab === "authenticity" && (
            <div className="tab-pane-content fade-in authenticity-panel">
              <div className="tab-panel-header">
                <span className="panel-kicker">SCIENTIFIC ACCREDITATION</span>
                <h3>Government Recognized Lab Verification & X-Ray</h3>
                <p>
                  We guarantee 100% natural Nepal origin with zero adulteration, synthetic gluing, or artificial carving.
                </p>
              </div>

              <div className="authenticity-columns-grid">
                <div className="auth-feature-box">
                  <div className="auth-icon-wrap">
                    <Scan size={26} />
                  </div>
                  <h4>Digital X-Ray Radiography</h4>
                  <figure className="auth-report-sample">
                    <a href={`${sampleReportBase}/xray.avif`} target="_blank" rel="noopener noreferrer" aria-label="Open sample 1 Mukhi X-ray image in a new tab">
                      <img src={`${sampleReportBase}/xray.avif`} alt="Sample 1 Mukhi Rudraksha X-ray report" loading="lazy" />
                      <span>View full X-ray ↗</span>
                    </a>
                    <figcaption>Sample 1 Mukhi report · Reference only</figcaption>
                  </figure>
                  <p>
                    High-resolution digital X-Ray imaging proves internal seed compartment chambers match the exact outer mukhi lines, confirming 100% botanical authenticity.
                  </p>
                  <ul className="auth-checklist">
                    <li><CheckCircle2 size={15} /> Internal seed cavity inspection</li>
                    <li><CheckCircle2 size={15} /> No glued segments or artificial inserts</li>
                    <li><CheckCircle2 size={15} /> Physical X-ray film report included</li>
                  </ul>
                </div>

                <div className="auth-feature-box">
                  <div className="auth-icon-wrap">
                    <ShieldCheck size={26} />
                  </div>
                  <h4>ISO Certified</h4>
                  <figure className="auth-report-sample">
                    <a href={`${sampleReportBase}/certificate.avif`} target="_blank" rel="noopener noreferrer" aria-label="Open sample 1 Mukhi certificate in a new tab">
                      <img src={`${sampleReportBase}/certificate.avif`} alt="Sample 1 Mukhi Rudraksha laboratory certificate" loading="lazy" />
                      <span>View full certificate ↗</span>
                    </a>
                    <figcaption>Sample 1 Mukhi certificate · Reference only</figcaption>
                  </figure>
                  <dl className="auth-report-fields">
                    <div><dt>Dimensions (mm)</dt><dd>The report records the specimen’s measured size in millimeters.</dd></div>
                    <div><dt>Weight (g)</dt><dd>The weight shown belongs to the tested specimen, measured in grams.</dd></div>
                    <div><dt>Report details</dt><dd>Use the report number and any verification details printed on the certificate to identify the tested specimen.</dd></div>
                  </dl>
                  <p>
                    Each collector bead is certified by an ISO 9001:2015 accredited gemological laboratory with unique online verifiable QR code and hologram seal.
                  </p>
                  <ul className="auth-checklist">
                    <li><CheckCircle2 size={15} /> Online verifiable report serial number</li>
                    <li><CheckCircle2 size={15} /> Exact millimeter dimensions & gram weight</li>
                    <li><CheckCircle2 size={15} /> Tamper-evident holographic security laminate</li>
                  </ul>
                </div>
              </div>
              <p className="auth-sample-disclaimer">These sample images explain the reports and are for reference only. They do not identify the actual bead supplied. Dimensions, weight, appearance and report details vary by specimen. Contact us for the available bead’s photos, measurements and certificate before ordering.</p>
            </div>
          )}

          {/* TAB 4: How to Wear & Maintain */}
          {activeTab === "wearing" && (
            <div className="tab-pane-content fade-in wearing-panel">
              <div className="tab-panel-header">
                <span className="panel-kicker">SACRED TRADITION</span>
                <h3>How to Wear & Care for Your Rudraksha</h3>
                <p>Simple daily guidelines to preserve the vitality and physical longevity of your sacred Nepal bead.</p>
              </div>

              <div className="wearing-cards-grid">
                <div className="wearing-card">
                  <h4>Auspicious Timing to Wear</h4>
                  <p>
                    Wear for the first time on a Shukla Paksha (waxing moon) Monday, during sunrise hours after a fresh bath, facing East or North while reciting the Beej Mantra.
                  </p>
                </div>

                <div className="wearing-card">
                  <h4>Casing & Threading</h4>
                  <p>
                    Can be strung in auspicious red, yellow, or black pure silk/cotton thread, or capped in 22K Gold or 925 Sterling Silver. Ensure the bead touches the skin or anahata chakra area.
                  </p>
                </div>

                <div className="wearing-card">
                  <h4>Cleaning & Oil Anointing</h4>
                  <p>
                    Wash gently once a month with warm water using a soft bristle brush. Pat dry and lightly anoint with natural sandalwood oil or virgin olive oil to prevent cracking.
                  </p>
                </div>

                <div className="wearing-card">
                  <h4>Sacred Etiquette</h4>
                  <p>
                    It is traditional practice to remove the bead during funeral ceremonies and sleep. Place it respectfully in your home altar or a clean pouch.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQs */}
          {activeTab === "faq" && (
            <div className="tab-pane-content fade-in faq-panel">
              <div className="tab-panel-header">
                <span className="panel-kicker">FREQUENTLY ASKED QUESTIONS</span>
                <h3>Everything You Need to Know</h3>
              </div>

              <div className="faq-list">
                <details className="faq-item" open>
                  <summary>How can I be certain this is an authentic Nepal Rudraksha?</summary>
                  <p>
                    Nepal Rudrakshas have deep, pronounced mukhi grooves, broad natural shapes, and distinct internal seed cavities visible through digital X-Ray imaging. We provide an accredited laboratory certificate with an online verifiable QR code for complete assurance.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>Can anyone wear this bead regardless of age, gender, or horoscope?</summary>
                  <p>
                    Yes. According to the Shiva Purana and Srimad Devi Bhagavatam, Rudraksha is Lord Shiva’s universal grace and can be worn by anyone seeking spiritual elevation, inner peace, and mental clarity.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>What is the difference between Small, Regular, and Collector sizes?</summary>
                  <p>
                    All sizes possess identical spiritual efficacy. Collector and Super Collector beads are naturally larger (27mm to 30mm+), heavier in density, and harvest in rarer quantities, making them cherished heirlooms.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>How long does international delivery take?</summary>
                  <p>
                    All international orders (Canada, USA, UK, Europe, Australia, UAE) are dispatched via DHL Express or FedEx Insured with full tracking within 3 to 5 business days.
                  </p>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
