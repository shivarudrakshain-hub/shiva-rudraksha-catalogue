import { questions } from "./faqData.js";
import { aiKnowledgeEngine } from "../services/aiKnowledgeEngine.js";

const stopWords = new Set(["what","which","where","when","how","why","does","do","can","could","is","are","a","an","the","to","of","for","i","me","my","you","your","and","in","on","with","about","please","rudraksha","bead","beads"]);
const normalize = (value) => value.toLowerCase().replace(/\bre[\s-]+(energ\w*)/g, "re$1").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
const words = (value) => [...new Set(normalize(value).split(" ").filter(w => w.length > 2 && !stopWords.has(w)))];

export function isAgentRequest(query) {
  const text = normalize(query);
  if (/\b(?:do not|don t|dont) (?:want|need|connect|transfer|contact)\b/.test(text)) return false;
  const roles = "(?:agents?|humans?|persons?|people|reps?|representatives?|owner|operators?|advis[eo]rs?|staff|team|support|someone|somebody|customer service|customer care)";
  const request = new RegExp(`\\b(?:talk|speak|chat|connect|transfer|reach|contact|message|call|ask|get|need|want|prefer|request)\\b(?:\\s+\\w+){0,8}\\s+${roles}\\b`);
  const direct = new RegExp(`^(?:please )?(?:(?:a|an|the|live|real|actual|human|customer) )*${roles}(?: please)?$`);
  return request.test(text) || direct.test(text)
    || /^(?:please )?(?:live chat|human interaction|human assistance)(?: please)?$/.test(text)
    || /\b(?:not a bot|no bots|stop (?:the )?(?:bot|automated replies))\b/.test(text)
    || /\b(?:someone|somebody|a human|a real person)\b(?:\s+\w+){0,3}\s+(?:help|assist|reply|respond)\b/.test(text);
}

export function getChatReply(question) {
  if (isAgentRequest(question)) {
    return {
      role: "bot",
      text: "Our support team is available directly on WhatsApp. Select the button below to discuss directly with us at +1 437-267-1257.",
      unanswered: question,
      agentRequested: true
    };
  }
  const match = findAnswer(question);
  if (match) {
    return {
      role: "bot",
      text: match.answer,
      source: match.question,
      category: match.category,
      productUrl: match.productUrl,
      isCustom: match.isCustom
    };
  }
  return {
    role: "bot",
    text: "I couldn't find a confident answer in our knowledge base. Please select the button below to discuss directly with our team on WhatsApp at +1 437-267-1257.",
    unanswered: question
  };
}

export function findAnswer(query) {
  const q = normalize(query);
  if (!q) return null;
  const terms = words(q);

  // Check store location/contact queries first so "store location" isn't misrouted to bead storage FAQs
  const isStoreQuery = q.includes("location") || q.includes("address") || q.includes("where are you") || (q.includes("where") && q.includes("store")) || q.includes("store located") || q.includes("scarborough") || q.includes("whatsapp") || q.includes("phone number");
  if (isStoreQuery) {
    const storeMatch = aiKnowledgeEngine.matchStoreInfo(q, terms);
    if (storeMatch) return storeMatch;
  }

  // Check website operations (stock, orders, login, privileges, secrets, tracking, payments)
  const websiteMatch = aiKnowledgeEngine.matchWebsiteOperations(q, terms);
  if (websiteMatch) return websiteMatch;

  // 1. First, check the 72 canonical FAQs
  if (terms.length) {
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
    }).sort((a, b) => b.score - a.score);

    const best = ranked[0];
    if (best && best.matches > 0 && !(terms.length >= 3 && best.matches / terms.length < 0.5)) {
      if (!ranked[1] || best.score !== ranked[1].score || best.matches > 1) {
        return best.item;
      }
    }
  }

  // 2. Fall back to AI Knowledge Engine (Mukhis 1-21, Vedic astrology, custom knowledge, store info)
  return aiKnowledgeEngine.findBestMatch(query);
}
