import { useMemo, useState } from "react";
import { Search, X, MessageCircle, ChevronDown } from "lucide-react";
import "./FAQPage.css";
import FAQAnswer from "./FAQAnswer";

import { questions } from "./faqData";

import { categories, filterQuestions } from "./faqSearch.js";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = useMemo(() => filterQuestions(query, category), [query, category]);
  const clearFilters = () => { setQuery(""); setCategory("All"); };
  const contactTeam = () => window.dispatchEvent(new CustomEvent("request-live-chat", { detail: query.trim() }));
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
          {categories.map((name) => <button type="button" key={name} aria-pressed={category === name} className={category === name ? "selected" : ""} onClick={() => setCategory(name)}>{name} ({filterQuestions("", name).length})</button>)}
        </div>
        <div className="faq-results-toolbar"><p className="faq-count" role="status">Showing {results.length} of {questions.length} FAQs{category !== "All" && ` in ${category}`}{query.trim() && ` matching “${query.trim()}”`}</p>{(query || category !== "All") && <button type="button" onClick={clearFilters}>Show all FAQs</button>}</div>
        <div className="faq-results">
          {results.map((item) => <details className="faq-entry" key={item.id}>
            <summary><span><small>{item.category}</small><strong>{item.question}</strong></span><ChevronDown size={21} aria-hidden="true" /></summary>
            <FAQAnswer text={item.answer} />
          </details>)}
          {!results.length && <div className="faq-empty"><h2>Can't find your question?</h2><p>Chat with us here. If we're offline, leave your name, email and message so we can reply later.</p><button className="faq-ask-link" type="button" onClick={contactTeam}><MessageCircle size={19}/> Chat or leave a message</button><button type="button" onClick={clearFilters}>Clear filters</button></div>}
        </div>
        <aside className="faq-help"><div><h2>Still have a question?</h2><p>Chat here without WhatsApp, or leave a message while we're offline.</p></div><button className="faq-contact-team" type="button" onClick={contactTeam}><MessageCircle size={19}/> Chat with our team</button></aside>
        <p className="faq-disclaimer">Spiritual associations described here are traditional beliefs, not guaranteed medical, financial, or personal outcomes. Product availability and terms should be confirmed before purchase.</p>
      </div>
    </main>
  );
}
