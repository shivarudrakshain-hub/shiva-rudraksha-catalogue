import { questions } from "./faqData.js";

const stopWords = new Set(["what","which","where","when","how","why","does","do","can","could","is","are","a","an","the","to","of","for","i","me","my","you","your","and","in","on","with","about","please","rudraksha","bead","beads"]);
const normalize = (value) => value.toLowerCase().replace(/\bre[\s-]+(energ\w*)/g, "re$1").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
const words = (value) => [...new Set(normalize(value).split(" ").filter(w => w.length > 2 && !stopWords.has(w)))];
export function findAnswer(query) {
  const q = normalize(query);
  if (!q) return null;
  const terms = words(q);
  if (!terms.length) return null;
  const ranked = questions.map(item => {
    const candidates = [item.question, ...(item.aliases || [])];
    const category = normalize(item.category);
    const categoryMatches = terms.filter(term => category.includes(term)).length;
    return candidates.map(candidate => {
      const title = normalize(candidate);
      const titleTerms = words(title);
      const matches = terms.filter(term => titleTerms.some(t => t === term || (term.length > 4 && t.startsWith(term)))).length;
      const sameTerms = titleTerms.length === terms.length && terms.every(term => titleTerms.includes(term));
      const score = (title === q ? 100 : sameTerms ? 60 : title.includes(q) ? 20 : 0) + matches * 4 + categoryMatches;
      return { item, score, matches };
    }).sort((a, b) => b.score - a.score)[0];
  }).sort((a,b) => b.score-a.score);
  const best = ranked[0];
  if (!best || best.matches === 0 || (terms.length >= 3 && best.matches / terms.length < .5)) return null;
  if (ranked[1] && best.score === ranked[1].score && best.matches <= 1) return null;
  return best.item;
}
