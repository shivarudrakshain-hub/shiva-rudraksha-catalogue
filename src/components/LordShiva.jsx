import { Flame, Eye, Mountain, Waves, Moon, Heart, Sparkles, CircleDot } from "lucide-react";
import "./LordShiva.css";

const aspects = [
  [<Sparkles />, "Creation & Transformation", "Shiva’s role as the ‘Destroyer’ represents transformation rather than malevolence—the ending of one state so that renewal and new beginnings can emerge."],
  [<Mountain />, "Renunciation & Asceticism", "Shiva is often portrayed in deep meditation at Mount Kailash. His ash-covered form represents detachment from worldly attachment and dedication to spiritual realization."],
  [<Eye />, "The Third Eye", "The third eye symbolizes insight beyond ordinary perception—the ability to recognize truth beyond surface appearances."],
  [<Flame />, "Nataraja", "As Nataraja, Shiva performs the cosmic dance representing creation, preservation, transformation and the continuous rhythm of existence."],
  [<CircleDot />, "Trident — Trishul", "The Trishul is one of Shiva’s best-known symbols and is commonly interpreted as representing fundamental triads such as creation, preservation and transformation."],
  [<Waves />, "Ganga", "Hindu tradition describes Shiva receiving the sacred Ganga in his matted hair, moderating the river’s descent before it reached the Earth."],
  [<Moon />, "The Crescent Moon", "The crescent moon worn by Shiva is associated with time, cycles, calmness and mastery over the changing phases of existence."],
  [<Heart />, "Family", "Shiva is traditionally worshipped with Parvati, the divine feminine energy or Shakti. Their sons Ganesha and Kartikeya are also major deities in Hindu traditions."],
];

export default function LordShiva() {
  return (
    <main className="rs-info-page lord-shiva-page">
      <section className="shiva-premium-hero" aria-labelledby="lord-shiva-title">
        <div className="shiva-premium-hero-copy">
          <span className="shiva-premium-kicker">🔱 THE ADIYOGI · MAHADEVA</span>
          <h1 id="lord-shiva-title">Who Is <em>Lord Shiva?</em></h1>
          <p>Discover the symbolism, sacred stories and spiritual significance of Mahadeva through Hindu tradition and the Shiva Purana.</p>
          <div className="shiva-premium-mantra"><strong>ॐ नमः शिवाय</strong><span>Om Namah Shivaya · A traditional mantra of devotion to Shiva</span></div>
        </div>
      </section>
      <div className="container rs-info-container">
      <section className="rs-info-section rs-intro shiva-premium-intro">
        <div className="shiva-premium-intro-copy">
          <div className="rs-section-title"><span>01</span><div><small>INTRODUCTION</small><h2>Lord Shiva</h2></div></div>
          <p>Lord Shiva is a principal deity in Hinduism and holds a central place in many Hindu traditions. He is often described as the transformer within the commonly presented Hindu triad of Brahma, Vishnu and Shiva, while Shaiva traditions worship Shiva as the Supreme Reality itself.</p>
          <p>Shiva embodies seemingly contrasting qualities: stillness and cosmic movement, renunciation and family life, dissolution and renewal. His imagery points toward meditation, self-knowledge, impermanence and spiritual liberation.</p>
        </div>
        <aside className="shiva-purana-highlight">
          <span>FROM THE SHIVA PURANA</span>
          <h3>Shiva as the Supreme Reality</h3>
          <p>In the Shiva Purana, Shiva is celebrated as the divine reality underlying creation, preservation and dissolution. The stories portray his boundless nature, compassion toward devotees and the importance of sincere devotion.</p>
          <small>Summary of traditional themes · Not a direct scriptural quotation</small>
        </aside>
      </section>

      <section className="rs-info-section shiva-purana-stories">
        <div className="rs-section-title"><span>02</span><div><small>SACRED NARRATIVES</small><h2>Stories from the Shiva Purana</h2></div></div>
        <div className="shiva-purana-story-grid">
          <article><span>✦ DIVINE INFINITY</span><h3>The Endless Pillar of Light</h3><p>The account of Shiva appearing as an immeasurable pillar of light before Brahma and Vishnu expresses the limitless nature of the divine, beyond ordinary measurement and pride.</p></article>
          <article><span>✦ DEVOTION & UNION</span><h3>Shiva and Parvati</h3><p>Stories of Parvati's devotion and her union with Shiva emphasize steadfast spiritual practice, divine partnership and the inseparability of Shiva and Shakti.</p></article>
          <article><span>✦ SINCERE WORSHIP</span><h3>The Power of Bhakti</h3><p>Across the Purana, devotees approach Shiva through prayer, remembrance, worship and humility. These accounts emphasize the importance of intention and devotion.</p></article>
        </div>
        <p className="shiva-purana-source">These are concise retellings of traditional narratives associated with the Shiva Purana, not verbatim translations. Chapter numbering varies by recension and edition.</p>
      </section>

      <section className="rs-info-section">
        <div className="rs-section-title"><span>03</span><div><small>SYMBOLISM</small><h2>Key Aspects of Lord Shiva</h2></div></div>
        <div className="rs-shiva-grid">
          {aspects.map(([icon, title, text]) => (
            <article className="rs-shiva-card" key={title}><div>{icon}</div><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="rs-info-section rs-dark-section">
        <div className="rs-section-title"><span>04</span><div><small>DEVOTION & PRACTICE</small><h2>Shiva, Rudraksha & Worship</h2></div></div>
        <div className="rs-shiva-story-grid">
          <article><h3>📿 Rudraksha</h3><p>Shiva is frequently depicted wearing Rudraksha beads. Within Hindu devotional traditions, Rudraksha is considered sacred and is used in prayer, mantra repetition and meditation.</p></article>
          <article><h3>ॐ Om Namah Shivaya</h3><p>“Om Namah Shivaya” is among the best-known mantras dedicated to Shiva. Devotees chant it during worship, meditation and personal spiritual practice.</p></article>
          <article><h3>🪔 Maha Shivaratri</h3><p>Maha Shivaratri is a major festival dedicated to Lord Shiva. Devotees may fast, keep vigil, perform Abhishekam, visit temples and spend time in prayer or meditation.</p></article>
          <article><h3>🕉 Philosophical Significance</h3><p>Different Hindu philosophical schools understand Shiva in different ways—from a personal deity and cosmic lord to the highest consciousness or ultimate reality beyond ordinary form.</p></article>
        </div>
      </section>

      <section className="rs-final-note">
        <div>🔱</div>
        <div><small>SPIRITUAL SIGNIFICANCE</small><h2>Transformation Through Awareness</h2><p>For millions of devotees, Lord Shiva represents inner stillness, courage, transformation, compassion and the search for liberation. His symbolism continues to inspire meditation, devotion and self-inquiry.</p></div>
      </section>
          </div>
    </main>
  );
}
