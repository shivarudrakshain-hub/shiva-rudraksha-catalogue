import { useMemo, useState } from "react";
import { Search, X, MessageCircle, ChevronDown } from "lucide-react";
import "./FAQPage.css";

const questions = [
  {
    "id": 0,
    "category": "Basics",
    "question": "What is a Rudraksha?",
    "answer": "A Rudraksha is the seed of a tree in the Elaeocarpus genus, traditionally used for prayer, meditation, and spiritual practice in Hindu traditions."
  },
  {
    "id": 1,
    "category": "Basics",
    "question": "What does Mukhi mean?",
    "answer": "Mukhi refers to the naturally occurring longitudinal divisions or lines on a Rudraksha bead. Different Mukhi counts have different traditional associations."
  },
  {
    "id": 2,
    "category": "Basics",
    "question": "Can anyone wear Rudraksha?",
    "answer": "Yes, people of different ages and backgrounds can wear Rudraksha. For children, ensure the jewellery is age-appropriate and does not present a choking or strangulation risk."
  },
  {
    "id": 3,
    "category": "Basics",
    "question": "Can women wear Rudraksha?",
    "answer": "Yes. Rudraksha is worn by women and men. Specific observances vary by family and spiritual tradition."
  },
  {
    "id": 4,
    "category": "Basics",
    "question": "Can I wear more than one Rudraksha?",
    "answer": "Yes, multiple beads may be worn together. For a comfortable, practical combination, ask us for guidance based on the intended use."
  },
  {
    "id": 5,
    "category": "Selection",
    "question": "Which Mukhi should I choose?",
    "answer": "Start with your purpose, preferred tradition, and budget. Our 1–21 Mukhi guide describes traditional associations; our team can help compare available beads."
  },
  {
    "id": 6,
    "category": "Selection",
    "question": "Do I need a birth chart to select Rudraksha?",
    "answer": "No. Some customers prefer astrological guidance, but a birth chart is not required to wear Rudraksha."
  },
  {
    "id": 7,
    "category": "Selection",
    "question": "What is the difference between Nepal and Indonesia Rudraksha?",
    "answer": "Both refer to sourcing regions. Beads may differ in size, texture, and groove visibility; neither origin alone establishes a spiritual or medical result."
  },
  {
    "id": 8,
    "category": "Selection",
    "question": "What are Small, Medium, Large and Collector sizes?",
    "answer": "These are product size or grade categories, not different Mukhi types. Exact dimensions can vary by bead; request measurements and photos before confirming."
  },
  {
    "id": 9,
    "category": "Selection",
    "question": "Does a larger Rudraksha work better?",
    "answer": "There is no established scientific evidence that a larger bead produces greater spiritual or health effects. Choose by preference, comfort, and collectibility."
  },
  {
    "id": 10,
    "category": "Selection",
    "question": "What is Gauri Shankar Rudraksha?",
    "answer": "It is a naturally joined double-bead formation traditionally associated with Shiva and Parvati."
  },
  {
    "id": 11,
    "category": "Selection",
    "question": "What is Ganesh Rudraksha?",
    "answer": "It is a bead with a natural protrusion traditionally associated with Lord Ganesha."
  },
  {
    "id": 12,
    "category": "Authenticity",
    "question": "How do I know a Rudraksha is genuine?",
    "answer": "Review clear photographs, natural surface features, sourcing information, and any available independent examination report. No single home test reliably establishes authenticity."
  },
  {
    "id": 13,
    "category": "Authenticity",
    "question": "Is a certificate included?",
    "answer": "Certificate availability can vary by individual bead. There is no certificate selector on the product page; please ask us what documentation is available for the exact item."
  },
  {
    "id": 14,
    "category": "Authenticity",
    "question": "Is an X-ray report available?",
    "answer": "X-ray documentation may be available for selected beads. Contact us before ordering to confirm what is available for the specific item."
  },
  {
    "id": 15,
    "category": "Authenticity",
    "question": "Can I use the water-floating or milk test?",
    "answer": "No. Floating, sinking, and milk-color tests are not reliable methods for confirming Rudraksha authenticity."
  },
  {
    "id": 16,
    "category": "Authenticity",
    "question": "Are website photos of the exact bead?",
    "answer": "Our product descriptions aim to show actual product photography. Please request confirmation of the specific bead and its current photos before finalizing an order."
  },
  {
    "id": 17,
    "category": "Wearing & Care",
    "question": "When should I first wear Rudraksha?",
    "answer": "Many devotees choose Monday after bathing and prayer, but practices differ. You may follow your family or teacher's tradition."
  },
  {
    "id": 18,
    "category": "Wearing & Care",
    "question": "Does Rudraksha need energization?",
    "answer": "Some traditions perform mantra recitation or consecration before wearing. It is a spiritual practice rather than a scientifically measurable requirement."
  },
  {
    "id": 19,
    "category": "Wearing & Care",
    "question": "Can I wear Rudraksha while sleeping or bathing?",
    "answer": "Yes, but practices vary. Removing Rudraksha for bathing, swimming, strenuous activity, or sleep can help prevent damage to the beads and fittings."
  },
  {
    "id": 20,
    "category": "Wearing & Care",
    "question": "How do I clean Rudraksha?",
    "answer": "Wipe gently with a soft dry cloth or brush. Avoid harsh chemicals, prolonged soaking, and excessive heat; dry thoroughly before storing."
  },
  {
    "id": 21,
    "category": "Wearing & Care",
    "question": "Can I apply oil to Rudraksha?",
    "answer": "Yes, some traditions use a very small amount of suitable oil. Avoid saturating the bead or its thread and follow care instructions for any metal fittings."
  },
  {
    "id": 22,
    "category": "Wearing & Care",
    "question": "Can family members share the same Rudraksha?",
    "answer": "Yes, family members can physically share a Rudraksha, but some spiritual traditions recommend keeping a bead for one wearer. Follow your preferred tradition."
  },
  {
    "id": 23,
    "category": "Wearing & Care",
    "question": "What if a bead cracks or breaks?",
    "answer": "Stop wearing damaged jewellery, especially if the thread or fittings are unsafe. Contact us for advice about repair or replacement."
  },
  {
    "id": 24,
    "category": "Orders & Shipping",
    "question": "Why are prices shown as Price on Request?",
    "answer": "Pricing depends on the specific bead, its size, rarity, and availability. Contact us on WhatsApp for a current quotation."
  },
  {
    "id": 25,
    "category": "Orders & Shipping",
    "question": "How can I order?",
    "answer": "Select the product and size, then use the WhatsApp enquiry button. We will discuss availability, the quotation, and next steps directly."
  },
  {
    "id": 26,
    "category": "Orders & Shipping",
    "question": "Do you ship to Canada, the USA, and internationally?",
    "answer": "We offer shipping enquiries for Canada, the USA, and other destinations. Confirm delivery availability, shipping fees, customs charges, and timelines before payment."
  },
  {
    "id": 27,
    "category": "Orders & Shipping",
    "question": "How long does delivery take?",
    "answer": "Delivery depends on the destination, stock, processing, and carrier. Ask for an estimated dispatch and delivery window for your order."
  },
  {
    "id": 28,
    "category": "Orders & Shipping",
    "question": "Can I return or exchange a Rudraksha?",
    "answer": "Yes, returns or exchanges may be possible depending on the item and order circumstances. Please confirm the applicable return, exchange, and cancellation terms before payment."
  },
  {
    "id": 29,
    "category": "Orders & Shipping",
    "question": "Can I order a custom mala or bracelet?",
    "answer": "Yes, you can enquire about a custom Rudraksha mala or bracelet. Share your preferred bead combination, size, and metal or thread preferences."
  },
  {
    "id": 30,
    "category": "Orders & Shipping",
    "question": "How do I contact Shiva Rudraksha Inc.?",
    "answer": "WhatsApp or call +1 437-267-1257, or email shivarudrakshain@gmail.com."
  },
  {
    "id": 31,
    "category": "Spiritual Guidance",
    "question": "Will Rudraksha cure illness or guarantee wealth?",
    "answer": "No medical, financial, or personal outcome can be guaranteed. Traditional spiritual beliefs should not replace professional healthcare or financial advice."
  },
  {
    "id": 32,
    "category": "Spiritual Guidance",
    "question": "Which mantra should I chant?",
    "answer": "Om Namah Shivaya is commonly used in Shiva worship. Specific Mukhi mantras vary by lineage; see our Mukhi guide or consult your spiritual teacher."
  }
];
const categories = ["All", ...new Set(questions.map((q) => q.category))];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return questions.filter((q) => (category === "All" || q.category === category) &&
      words.every((word) => (q.question + " " + q.answer + " " + q.category).toLocaleLowerCase().includes(word)));
  }, [query, category]);
  return (
    <main className="faq-page page-shell">
      <div className="container faq-wrap">
        <header className="faq-hero">
          <span className="faq-kicker">SHIVA RUDRAKSHA INC. · HELP CENTRE</span>
          <h1>Frequently Asked Questions</h1>
          <p>Clear answers about Rudraksha, authenticity, sizes, wearing, care, and ordering.</p>
          <label className="faq-search">
            <Search size={21} aria-hidden="true" />
            <input type="search" aria-label="Search frequently asked questions" placeholder="Search a question, e.g. certificate, size, delivery…" value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={19}/></button>}
          </label>
        </header>
        <div className="faq-filters" role="group" aria-label="FAQ categories">
          {categories.map((name) => <button type="button" key={name} aria-pressed={category === name} className={category === name ? "selected" : ""} onClick={() => setCategory(name)}>{name}</button>)}
        </div>
        <p className="faq-count" aria-live="polite">{results.length} {results.length === 1 ? "answer" : "answers"} found</p>
        <div className="faq-results">
          {results.map((item) => <details className="faq-entry" key={item.id}>
            <summary><span><small>{item.category}</small><strong>{item.question}</strong></span><ChevronDown size={21} aria-hidden="true" /></summary>
            <p>{item.answer}</p>
          </details>)}
          {!results.length && <div className="faq-empty"><h2>No matching questions</h2><p>Try another keyword or choose All categories.</p><button type="button" onClick={() => {setQuery("");setCategory("All");}}>Clear filters</button></div>}
        </div>
        <aside className="faq-help"><div><h2>Still have a question?</h2><p>Speak directly with Shiva Rudraksha Inc. for product-specific information.</p></div><a href="https://wa.me/14372671257?text=Hello%20Shiva%20Rudraksha%20Inc.%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/> Ask on WhatsApp</a></aside>
        <p className="faq-disclaimer">Spiritual associations described here are traditional beliefs, not guaranteed medical, financial, or personal outcomes. Product availability and terms should be confirmed before purchase.</p>
      </div>
    </main>
  );
}
