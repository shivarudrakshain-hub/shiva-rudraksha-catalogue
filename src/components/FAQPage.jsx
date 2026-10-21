import { useMemo, useState } from "react";
import { Search, X, MessageCircle, ChevronDown } from "lucide-react";
import "./FAQPage.css";

import { questions } from "./faqData";

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
      <section className="faq-premium-hero">
        <div className="faq-premium-copy">
          <span className="faq-kicker">ॐ &nbsp; SHIVA RUDRAKSHA INC. · FAQ</span>
          <h1>Your Questions,<br /><em>Our Guidance.</em></h1>
          <p>Find answers about Rudraksha beads, authenticity, care, wearing guidelines and more. If you still have questions, feel free to contact us.</p>
          <label className="faq-search">
            <Search size={21} aria-hidden="true" />
            <input type="search" aria-label="Search frequently asked questions" placeholder="Search FAQs, e.g. certificate, cleaning, delivery…" value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={19}/></button>}
          </label>
        </div>
        <div className="faq-premium-photo" role="img" aria-label="Lord Shiva in the Himalayas" />
      </section>
      <div className="container faq-wrap">
        <div className="faq-filters" role="group" aria-label="FAQ categories">
          {categories.map((name) => <button type="button" key={name} aria-pressed={category === name} className={category === name ? "selected" : ""} onClick={() => setCategory(name)}>{name}</button>)}
        </div>
        <p className="faq-count" aria-live="polite">{results.length} {results.length === 1 ? "answer" : "answers"} found</p>
        <div className="faq-results">
          {results.map((item) => <details className="faq-entry" key={item.id}>
            <summary><span><small>{item.category}</small><strong>{item.question}</strong></span><ChevronDown size={21} aria-hidden="true" /></summary>
            <p>{item.answer}</p>
          </details>)}
          {!results.length && <div className="faq-empty"><h2>Can't find your question?</h2><p>Send your question directly to Shiva Rudraksha Inc. and we'll respond personally.</p><a className="faq-ask-link" href={`https://wa.me/14372671257?text=${encodeURIComponent("Hello Shiva Rudraksha Inc., I have a question: " + query.trim())}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/> Send Us Your Question</a><button type="button" onClick={() => {setQuery("");setCategory("All");}}>Clear filters</button></div>}
        </div>
        <aside className="faq-help"><div><h2>Still have a question?</h2><p>Speak directly with Shiva Rudraksha Inc. for product-specific information.</p></div><a href="https://wa.me/14372671257?text=Hello%20Shiva%20Rudraksha%20Inc.%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/> Send Us Your Question</a></aside>
        <p className="faq-disclaimer">Spiritual associations described here are traditional beliefs, not guaranteed medical, financial, or personal outcomes. Product availability and terms should be confirmed before purchase.</p>
      </div>
    </main>
  );
}
