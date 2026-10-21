import { questions } from "../components/faqData.js";

/**
 * Shiva Rudraksha Inc. - Core Sacred Store & Vedic Knowledge Graph
 * Fully trained on entire website: Products, Spiritual Guide, FAQs, Astrology, Care & Company Operations.
 * Dynamically self-updating: Learns new information immediately when catalog, guide, or custom entries update.
 */

const STORAGE_KEY = "shiva_ai_custom_knowledge";

// Vedic planetary & deity correlations for intelligent guidance
export const VEDIC_CORRELATIONS = {
  planets: {
    sun: { mukhis: [1, 12], name: "Sun (Surya)", qualities: "Confidence, leadership, vitality, father relationship, career authority" },
    moon: { mukhis: [2, 16], name: "Moon (Chandra)", qualities: "Emotional stability, calm mind, maternal bond, memory, intuition" },
    mars: { mukhis: [3, 11], name: "Mars (Mangal)", qualities: "Courage, energy, overcoming lethargy, pacifying Manglik dosha" },
    mercury: { mukhis: [4, 10], name: "Mercury (Budha)", qualities: "Intellect, communication, analytical skills, commerce, speech" },
    jupiter: { mukhis: [5, 11], name: "Jupiter (Brihaspati / Guru)", qualities: "Wisdom, higher learning, good fortune, spiritual growth, teacher blessings" },
    venus: { mukhis: [6, 13], name: "Venus (Shukra)", qualities: "Love, attraction, artistic talent, marital happiness, luxury" },
    saturn: { mukhis: [7, 14], name: "Saturn (Shani)", qualities: "Pacifying Shani Sade Sati, discipline, removing financial hardship, liberation" },
    rahu: { mukhis: [8], name: "Rahu", qualities: "Overcoming sudden setbacks, illusions, fear of unknown, pacifying Kaal Sarp dosha" },
    ketu: { mukhis: [9], name: "Ketu", qualities: "Spiritual mastery, intuition, detachment from worldly fears, occult knowledge" },
  },
  rashis: {
    aries: { ruler: "Mars", mukhis: [3, 11], name: "Aries (Mesha)" },
    taurus: { ruler: "Venus", mukhis: [6, 7, 13], name: "Taurus (Vrishabha)" },
    gemini: { ruler: "Mercury", mukhis: [4, 10], name: "Gemini (Mithuna)" },
    cancer: { ruler: "Moon", mukhis: [2, 16], name: "Cancer (Karka)" },
    leo: { ruler: "Sun", mukhis: [1, 12], name: "Leo (Simha)" },
    virgo: { ruler: "Mercury", mukhis: [4, 10], name: "Virgo (Kanya)" },
    libra: { ruler: "Venus", mukhis: [6, 7, 13], name: "Libra (Tula)" },
    scorpio: { ruler: "Mars", mukhis: [3, 11], name: "Scorpio (Vrischika)" },
    sagittarius: { ruler: "Jupiter", mukhis: [5, 11], name: "Sagittarius (Dhanu)" },
    capricorn: { ruler: "Saturn", mukhis: [7, 14], name: "Capricorn (Makara)" },
    aquarius: { ruler: "Saturn", mukhis: [7, 14], name: "Aquarius (Kumbha)" },
    pisces: { ruler: "Jupiter", mukhis: [5, 11], name: "Pisces (Meena)" },
  },
  needs: {
    wealth: { mukhis: [7, 21, 14, 19], deity: "Goddess Mahalakshmi & Lord Kuber", desc: "For abundance, financial stability, and business progress, the 7 Mukhi (ruled by Mahalakshmi) and 21 Mukhi (ruled by Kuber) are supreme." },
    health: { mukhis: [3, 5, 12, 16], deity: "Agni Deva & Mahamrityunjaya Shiva", desc: "For vitality and health, 3 Mukhi releases stress and past burdens, 5 Mukhi supports blood pressure and mental calm, and 16 Mukhi invokes Mahamrityunjaya healing." },
    marriage: { mukhis: [2, 13], special: "Gauri Shankar", deity: "Ardhanarishvara / Shiva-Parvati", desc: "For relationship harmony, finding a suitable life partner, or marital peace, 2 Mukhi Rudraksha and naturally conjoined Gauri Shankar Rudraksha are traditionally recommended." },
    career: { mukhis: [1, 12, 14], deity: "Surya & Lord Shiva", desc: "For leadership, government exams, promotions, and executive authority, 1 Mukhi, 12 Mukhi (12 Adityas), and 14 Mukhi (Deva Mani) bring unmatched clarity and influence." },
    education: { mukhis: [4, 6], special: "Ganesh Rudraksha", deity: "Lord Brahma, Kartikeya & Ganesha", desc: "For students, research scholars, and memory enhancement, 4 Mukhi (Brahma) and Ganesh Rudraksha (with natural trunk) awaken intellect and speech." },
    protection: { mukhis: [8, 9, 10, 11], deity: "Durga, Hanuman & Vishnu", desc: "For shielding from negative energies, evil eye, and court cases, 9 Mukhi (Durga Shakti), 10 Mukhi (Vishnu protective shield), and 11 Mukhi (Hanuman) offer divine defense." },
    meditation: { mukhis: [1, 5, 14, 15], deity: "Paramashiva", desc: "For deep meditation, inner stillness, and Kundalini awakening, 1 Mukhi, 5 Mukhi, and 14 Mukhi open higher consciousness and quieten the restless mind." }
  }
};

export const STORE_INFO = {
  name: "Shiva Rudraksha Inc.",
  location: "Scarborough, Ontario, Canada",
  phone: "+1 437-267-1257",
  whatsapp: "+1 437-267-1257",
  whatsappLink: "https://wa.me/14372671257",
  email: "shivarudrakshain@gmail.com",
  shipping: "Worldwide tracked shipping across Canada, the USA, and internationally via Canada Post, UPS, FedEx and DHL.",
  authenticity: "100% genuine Nepal and Java beads with laboratory certification and X-ray authenticity verification available."
};

export const DEFAULT_CUSTOM_KNOWLEDGE = [
  {
    id: "ck-custom-malas",
    topic: "Custom Mala Design & Silver Stringing",
    keywords: ["custom mala", "silver capping", "gold wire", "stringing", "customize mala", "thread", "silk thread", "custom design"],
    answer: "Yes! At Shiva Rudraksha Inc., we handcraft custom Rudraksha Malas tailored to your specific spiritual needs, astrological chart, or deity devotion. Options include pure silver wire/capping, gold capping upon request, or traditional auspicious red/yellow silk thread with knots between beads. Message our master stringing team on WhatsApp at +1 437-267-1257 for a consultation.",
    category: "Custom Orders & Crafting"
  },
  {
    id: "ck-astrology-service",
    topic: "Free Vedic Astrology & Kundali Rudraksha Recommendation",
    keywords: ["astrology", "horoscope", "kundali", "birth chart", "rashi", "nakshatra", "consultation", "which bead to wear", "recommendation"],
    answer: "We provide personalized Vedic astrology and birth chart (Kundali) analysis to determine which Mukhi aligns with your Lagna (Ascendant), Moon Rashi, Janma Nakshatra, and current planetary Mahadasha. We also specialize in combinations for pacifying doshas like Shani Sade Sati, Rahu/Ketu afflictions, and Manglik dosha. Visit our Birth Chart Recommendation page on the site or WhatsApp us with your birth details.",
    category: "Astrological Guidance"
  },
  {
    id: "ck-nepal-vs-indonesia",
    topic: "Nepal vs Indonesian (Java) Rudraksha Differences",
    keywords: ["nepal vs indonesia", "indonesian beads", "java rudraksha", "nepali beads difference", "size difference", "which is better", "java vs nepal"],
    answer: "Nepal Rudraksha beads are naturally large (20mm to 35mm+), heavy, with deeply defined mukhi furrows (clefts) and high electromagnetic potential. Indonesian (Java) beads are naturally smaller (8mm to 16mm), smoother, and lightweight. Both are sacred and authentic per ancient scriptures. Nepal beads are prized for individual collector pendants and high-intensity spiritual practice, while Indonesian beads are preferred for comfortable everyday 108-bead Japa Malas.",
    category: "Authenticity & Knowledge"
  },
  {
    id: "ck-shipping-returns",
    topic: "Shipping Times, Tracking & Delivery",
    keywords: ["shipping time", "delivery time", "how long to arrive", "tracking order", "return policy", "ship to usa", "ship to canada"],
    answer: "Orders within Canada typically arrive in 2–4 business days. USA shipments take 3–6 business days via tracked expedited services. International worldwide delivery takes 5–10 business days depending on destination. Every parcel is safely packed in sacred velvet pouches, insured, and provided with full online tracking.",
    category: "Orders & Shipping"
  },
  {
    id: "ck-siddha-mala",
    topic: "Sarva Siddha Mala & Indra Mala Combinations",
    keywords: ["siddha mala", "indra mala", "all mukhi combination", "1 to 14 mukhi", "1 to 21 mukhi", "supreme mala"],
    answer: "The Siddha Mala is a supreme Vedic combination comprising 1 to 14 Mukhi beads plus Gauri Shankar and Ganesh Rudraksha, representing all principal deities and pacifying all 9 planets (Navagrahas). The Indra Mala extends from 1 to 21 Mukhi with Gauri Shankar and Trijuti, considered the crown jewel of all spiritual treasures. Each bead is hand-selected and lab-certified.",
    category: "Sacred Combinations"
  },
  {
    id: "ck-stock-availability",
    topic: "Stock & Inventory Availability",
    keywords: ["stock", "availability", "available for sale", "in stock", "out of stock", "real time stock", "ready to ship", "current inventory"],
    answer: "All sacred Rudraksha beads and combinations listed in our online catalogue with pricing are in stock and available for immediate sale. For collector beads, each high-resolution photo and X-ray shows the exact individual specimen you will receive. For ultra-rare beads (15–21 Mukhi, collector Gauri Shankar, Indra Mala) or specific bead diameters, real-time stock can also be verified and reserved directly via WhatsApp at +1 437-267-1257.",
    category: "Stock & Inventory"
  },
  {
    id: "ck-how-to-order",
    topic: "How to Place an Order Online",
    keywords: ["how to order", "can i order now", "how to buy", "place an order", "buying process", "checkout", "add to cart", "purchase online"],
    answer: "You can order online 24/7 on our website! Browse our catalogue, select your desired Rudraksha, and click 'Add to Sacred Cart' or 'Buy Now'. Then open your Sacred Cart drawer from the top right and proceed to checkout using our fast Guest Checkout—no password or account registration required. Alternatively, you can message our team on WhatsApp at +1 437-267-1257 to place orders directly or request custom silver/gold stringing.",
    category: "Orders & Purchasing"
  },
  {
    id: "ck-login-account",
    topic: "Website Login, Registration & Customer Accounts",
    keywords: ["how to login", "login", "log in", "sign in", "create account", "register", "guest checkout", "need an account", "my profile", "account access"],
    answer: "No account or login is required to order from Shiva Rudraksha Inc.! Anyone can checkout quickly as a guest with just their delivery address and email. If you wish to review past orders or update customer preferences, you can access the Account section via the top navigation bar or visit /profile. The Admin portal (#admin) is strictly restricted to store management for catalogue maintenance; general customers do not require admin access.",
    category: "Account & Access"
  },
  {
    id: "ck-privileges-security",
    topic: "Website Privileges, Features & Confidential Secrets",
    keywords: ["privileges", "permissions", "what can be accessed", "features available", "what to tell", "what not to tell", "keep secret", "confidential", "admin access", "secrets", "api token", "wholesale price"],
    answer: "Publicly Accessible: Full 1–21 Mukhi guide, deities, mantras, live product catalogue with 360° photos and lab certificates, free Kundali calculator (#recommendations), guest checkout, care guides, and WhatsApp consultation (+1 437-267-1257). Strictly Confidential & Secret: Admin management portal (#admin), GitHub access tokens, backend credentials, direct Nepal farmer harvest wholesale contracts, and customer financial payment data.",
    category: "Website Features & Privileges"
  },
  {
    id: "ck-order-tracking",
    topic: "Order Tracking & Shipment Updates",
    keywords: ["track my order", "order status", "where is my order", "tracking number", "track parcel", "has my order shipped"],
    answer: "Once your consecrated parcel is dispatched, you receive an automated confirmation email with your courier tracking number (Canada Post, UPS, FedEx, or DHL). You can track it online or message our team on WhatsApp at +1 437-267-1257 with your Order ID or Name for immediate personal updates.",
    category: "Order Tracking"
  },
  {
    id: "ck-payment-currencies",
    topic: "Payment Methods & Multi-Currency Support",
    keywords: ["payment methods", "how to pay", "credit card", "debit card", "currency", "pay in inr", "pay in cad", "pay in usd", "interac"],
    answer: "We accept Visa, MasterCard, American Express, and major international cards with secure 256-bit SSL encryption. You can view prices and pay in USD ($), CAD ($), INR (₹), EUR (€), GBP (£), or AUD ($) using the top currency selector. Canadian customers may also pay via Interac e-Transfer upon request via WhatsApp (+1 437-267-1257).",
    category: "Payment & Currencies"
  },
  {
    id: "ck-returns-guarantee",
    topic: "Return Policy & Authenticity Guarantee",
    keywords: ["return policy", "refund", "exchange", "money back guarantee", "can i return", "satisfaction guarantee"],
    answer: "Every Rudraksha from Shiva Rudraksha Inc. comes with a 100% Genuine Authenticity Guarantee backed by gemological testing and X-ray radiography. If your order arrives damaged or incorrect, contact us within 7 days of delivery on WhatsApp at +1 437-267-1257 or email shivarudrakshain@gmail.com for an immediate replacement or full resolution.",
    category: "Returns & Guarantees"
  }
];

// Built-in canonical knowledge for Mukhi 1 to 21 + specials
export const SACRED_MUKHI_DIRECTORY = {
  1: { mukhi: 1, name: "1 Mukhi Rudraksha", deity: "Lord Shiva / Paramashiva", planet: "Sun (Surya)", chakra: "Sahasrara (Crown)", mantra: "Om Hreem Namah / Om Namah Shivaya", benefits: "Supreme consciousness, leadership, focus, spiritual detachment, inner peace.", whoShouldWear: "Spiritual seekers, leaders, meditators, and those seeking purposeful clarity." },
  2: { mukhi: 2, name: "2 Mukhi Rudraksha", deity: "Ardhanarishvara (Shiva & Parvati)", planet: "Moon (Chandra)", chakra: "Swadhisthana (Sacral) / Anahata (Heart)", mantra: "Om Namah", benefits: "Marital harmony, emotional stability, healing conflicts, family unity.", whoShouldWear: "Couples, partners, and those desiring inner peace and relationship harmony." },
  3: { mukhi: 3, name: "3 Mukhi Rudraksha", deity: "Agni Deva (Fire God)", planet: "Mars (Mangal)", chakra: "Manipura (Solar Plexus)", mantra: "Om Kleem Namah", benefits: "Releases past guilt, burns negative karma, boosts confidence, overcomes lethargy.", whoShouldWear: "Those feeling held back by past mistakes, anxiety, low energy, or self-doubt." },
  4: { mukhi: 4, name: "4 Mukhi Rudraksha", deity: "Lord Brahma (The Creator)", planet: "Mercury (Budha)", chakra: "Vishuddha (Throat)", mantra: "Om Hreem Namah", benefits: "Intellect, creativity, eloquent speech, memory retention, logical reasoning.", whoShouldWear: "Students, teachers, writers, researchers, public speakers, and professionals." },
  5: { mukhi: 5, name: "5 Mukhi Rudraksha", deity: "Kalagni Rudra (Lord Shiva)", planet: "Jupiter (Brihaspati)", chakra: "Vishuddha (Throat)", mantra: "Om Hreem Namah", benefits: "Blood pressure regulation, peace of mind, removes negative thoughts, universal well-being.", whoShouldWear: "Universal bead suitable for all ages, genders, and backgrounds for daily wearing and Japa." },
  6: { mukhi: 6, name: "6 Mukhi Rudraksha", deity: "Lord Kartikeya (Skanda)", planet: "Venus (Shukra) / Mars", chakra: "Muladhara (Root)", mantra: "Om Hreem Hoom Namah", benefits: "Willpower, physical stamina, emotional grounding, attractive personality.", whoShouldWear: "Athletes, managers, youth, and those seeking emotional and physical balance." },
  7: { mukhi: 7, name: "7 Mukhi Rudraksha", deity: "Goddess Mahalakshmi", planet: "Saturn (Shani)", chakra: "Anahata (Heart)", mantra: "Om Hoom Namah", benefits: "Wealth, abundance, pacifying Shani Sade Sati, removing financial stagnation.", whoShouldWear: "Business owners, professionals, investors, and anyone facing financial hurdles or Saturn afflictions." },
  8: { mukhi: 8, name: "8 Mukhi Rudraksha", deity: "Lord Ganesha", planet: "Rahu", chakra: "Muladhara (Root)", mantra: "Om Hoom Namah", benefits: "Removes hurdles and obstacles, brings wisdom, protects against Rahu adversities.", whoShouldWear: "Those launching new ventures, facing unexpected road blocks, or dealing with Rahu dosha." },
  9: { mukhi: 9, name: "9 Mukhi Rudraksha", deity: "Goddess Durga (Navadurga / Shakti)", planet: "Ketu", chakra: "Ajna (Third Eye)", mantra: "Om Hreem Hoom Namah", benefits: "Fearlessness, energy, courage, removes illusions, shields from negative influences.", whoShouldWear: "Women seeking divine Shakti protection, spiritual seekers, and those facing Ketu distress." },
  10: { mukhi: 10, name: "10 Mukhi Rudraksha", deity: "Lord Vishnu (The Preserver)", planet: "All 9 Planets (Navagraha)", chakra: "Swadhisthana", mantra: "Om Hreem Namah", benefits: "Protection from all 10 directions, pacifies all planetary afflictions, wards off black magic and evil eye.", whoShouldWear: "Those experiencing planetary disturbances, legal battles, or seeking all-around protection." },
  11: { mukhi: 11, name: "11 Mukhi Rudraksha", deity: "11 Rudras & Lord Hanuman", planet: "All Planets / Mars", chakra: "Ajna (Third Eye)", mantra: "Om Hreem Hoom Namah", benefits: "Supreme courage, physical and mental strength, right judgment, meditative focus.", whoShouldWear: "Meditators, leaders, yogis, athletes, and devotees of Lord Hanuman." },
  12: { mukhi: 12, name: "12 Mukhi Rudraksha", deity: "Surya Deva (12 Adityas / Sun)", planet: "Sun (Surya)", chakra: "Manipura (Solar Plexus)", mantra: "Om Krown Kshown Rowm Namah", benefits: "Radiance, executive authority, administrative success, physical vitality, dispels worry.", whoShouldWear: "Politicians, administrators, doctors, leaders, and anyone desiring charisma and high self-esteem." },
  13: { mukhi: 13, name: "13 Mukhi Rudraksha", deity: "Kamadeva & King Indra", planet: "Venus (Shukra)", chakra: "Swadhisthana (Sacral)", mantra: "Om Hreem Namah", benefits: "Charm, hypnotic attraction, eloquence, fulfillment of desires, worldly prosperity.", whoShouldWear: "Marketers, actors, artists, diplomats, and negotiators." },
  14: { mukhi: 14, name: "14 Mukhi Rudraksha", deity: "Lord Shiva & Lord Hanuman (Deva Mani)", planet: "Saturn & Mars", chakra: "Ajna (Third Eye)", mantra: "Om Namah", benefits: "Awakens the Sixth Sense (intuition), foresight, guides crucial decisions, protects from catastrophes.", whoShouldWear: "CEOs, judges, strategists, visionaries, and spiritual masters." },
  15: { mukhi: 15, name: "15 Mukhi Rudraksha", deity: "Pashupatinath (Lord Shiva)", planet: "Mercury / Heart", chakra: "Anahata (Heart)", mantra: "Om Hreem Namah", benefits: "Unconditional love, healing emotional trauma, deep intuition, heart chakra awakening.", whoShouldWear: "Healers, counselors, and those seeking forgiveness and spiritual liberation." },
  16: { mukhi: 16, name: "16 Mukhi Rudraksha", deity: "Lord Rama / Mahamrityunjaya Shiva", planet: "Moon / Jupiter", chakra: "Vishuddha / Heart", mantra: "Om Hreem Hoom Namah", benefits: "Conquers fear of death, victorious in crises, protects home from negativity.", whoShouldWear: "Those recovering from acute illness or navigating intense life transitions." },
  17: { mukhi: 17, name: "17 Mukhi Rudraksha", deity: "Lord Vishwakarma & Katyayani", planet: "Saturn", chakra: "Ajna (Third Eye)", mantra: "Om Hreem Hoom Namah", benefits: "Sudden unexpected wealth, mastery of crafts, architecture, and project success.", whoShouldWear: "Engineers, architects, investors, builders, and entrepreneurs." },
  18: { mukhi: 18, name: "18 Mukhi Rudraksha", deity: "Bhumi Devi (Mother Earth)", planet: "Earth / Mars", chakra: "Muladhara (Root)", mantra: "Om Hreem Namah", benefits: "Abundance from land, real estate success, grounding, healthy pregnancy.", whoShouldWear: "Real estate professionals, farmers, miners, and expectant mothers." },
  19: { mukhi: 19, name: "19 Mukhi Rudraksha", deity: "Lord Narayana (Supreme Vishnu)", planet: "Mercury / Sun", chakra: "Anahata (Heart)", mantra: "Om Hreem Hoom Namah", benefits: "Fulfillment of all desires, continuous flow of wealth, stress-free abundance.", whoShouldWear: "Business magnates and householders seeking complete material and spiritual fulfillment." },
  20: { mukhi: 20, name: "20 Mukhi Rudraksha", deity: "Lord Brahma (Creator of the Cosmos)", planet: "All Planets", chakra: "Sahasrara (Crown)", mantra: "Om Hreem Namah", benefits: "Creator of miracles, profound spiritual realization, occult mastery, scientific invention.", whoShouldWear: "Innovators, spiritual preceptors, scientists, and high-order creators." },
  21: { mukhi: 21, name: "21 Mukhi Rudraksha", deity: "Lord Kuber (Lord of Celestial Wealth)", planet: "All Planets / Venus", chakra: "Crown & Root", mantra: "Om Hreem Hoom Shivaya Namah", benefits: "Immense eternal wealth, royal comfort, protector of assets, spiritual transcendence.", whoShouldWear: "Treasurers, visionaries, high-net-worth custodians, and royal patrons." }
};

export const SPECIAL_BEADS_DIRECTORY = {
  "gauri-shankar": {
    name: "Gauri Shankar Rudraksha",
    deity: "Lord Shiva and Goddess Parvati",
    planet: "Moon & Venus",
    chakra: "Heart (Anahata)",
    benefits: "Unified form of Shiva and Shakti. Supreme bead for marital bliss, finding soulmate, family peace, and fertility.",
    mantra: "Om Gauri Shankaraya Namah"
  },
  "ganesh": {
    name: "Ganesh Rudraksha",
    deity: "Lord Ganesha (Vighnaharta)",
    planet: "Mercury & Rahu",
    chakra: "Root (Muladhara)",
    benefits: "Features a natural trunk-like protrusion. Bestows intellect, removes obstacles, guarantees success in new ventures.",
    mantra: "Om Gan Ganapataye Namah"
  },
  "garbh-gauri": {
    name: "Garbh Gauri Rudraksha",
    deity: "Goddess Parvati and Lord Ganesha",
    planet: "Moon",
    chakra: "Heart & Sacral",
    benefits: "One bead smaller conjoined to a larger bead. Symbolizes mother and child bond, safe pregnancy, and child protection.",
    mantra: "Om Garbh Gauraye Namah"
  },
  "siddha-mala": {
    name: "Sarva Siddha Mala",
    deity: "All Vedic Deities (Shiva, Vishnu, Durga, Ganesha, Surya)",
    planet: "All 9 Navagrahas",
    chakra: "All 7 Chakras",
    benefits: "Sacred synergy of 1 to 14 Mukhi beads plus Gauri Shankar and Ganesh. Complete spiritual armour and holistic life harmonization.",
    mantra: "Om Namah Shivaya"
  },
  "indra-mala": {
    name: "Indra Mala (1 to 21 Mukhi)",
    deity: "The Supreme Cosmic Hierarchy",
    planet: "Cosmic Sovereignty",
    chakra: "All Chakras",
    benefits: "The rarest and most powerful spiritual possession on Earth. Bestows supreme authority, cosmic wisdom, and absolute protection.",
    mantra: "Om Namah Shivaya"
  }
};

// Stop words and normalization tools
const STOP_WORDS = new Set([
  "what","which","where","when","how","why","does","do","can","could","is","are","a","an","the",
  "to","of","for","i","me","my","you","your","and","in","on","with","about","please","tell","give",
  "rudraksha","bead","beads","buy","cost","price"
]);

export function normalize(value) {
  if (!value) return "";
  return String(value)
    .toLowerCase()
    .replace(/\bre[\s-]+(energ\w*)/g, "re$1")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractWords(value) {
  return [...new Set(normalize(value).split(" ").filter(w => w.length > 2 && !STOP_WORDS.has(w)))];
}

// Word to number mapping for Mukhis
const WORD_TO_NUMBER = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, "twenty one": 21
};

/**
 * Intelligent Dynamic Knowledge Engine Class
 */
class AIKnowledgeEngine {
  constructor() {
    this.dynamicProducts = [];
    this.dynamicGuide = [];
    this.customKnowledge = [...DEFAULT_CUSTOM_KNOWLEDGE];
    this.isInitialized = false;
    this.listenersAttached = false;
  }

  init() {
    if (this.isInitialized) return;
    this.loadCustomStorage();
    this.fetchRemoteKnowledge();
    this.attachListeners();
    this.isInitialized = true;
  }

  loadCustomStorage() {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (!this.customKnowledge.some(c => c.id === item.id)) {
              this.customKnowledge.unshift(item);
            }
          }
        }
      }
    } catch {
      // quota or private mode ignore
    }
  }

  saveCustomStorage() {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.customKnowledge));
      window.dispatchEvent(new CustomEvent("chatbot-knowledge-updated", { detail: this.customKnowledge }));
    } catch {
      // ignore
    }
  }

  async fetchRemoteKnowledge() {
    if (typeof window === "undefined" || !window.fetch) return;
    const base = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

    // 1. Fetch chatbot-knowledge.json
    try {
      const res = await fetch(`${base}data/chatbot-knowledge.json?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.customKnowledge && Array.isArray(data.customKnowledge)) {
          // Merge remote custom knowledge avoiding duplicates
          for (const item of data.customKnowledge) {
            if (!this.customKnowledge.some(c => c.id === item.id || c.topic === item.topic)) {
              this.customKnowledge.push(item);
            }
          }
        }
      }
    } catch {
      // silent fallback
    }

    // 2. Fetch products.json if not yet populated
    if (this.dynamicProducts.length === 0) {
      try {
        const pRes = await fetch(`${base}data/products.json`);
        if (pRes.ok) {
          const prods = await pRes.json();
          if (Array.isArray(prods)) {
            this.setProducts(prods);
          }
        }
      } catch {
        // fallback
      }
    }

    // 3. Fetch rudraksha-guide.json
    if (this.dynamicGuide.length === 0) {
      try {
        const gRes = await fetch(`${base}data/rudraksha-guide.json`);
        if (gRes.ok) {
          const guide = await gRes.json();
          if (Array.isArray(guide)) {
            this.dynamicGuide = guide;
          }
        }
      } catch {
        // fallback
      }
    }
  }

  attachListeners() {
    if (this.listenersAttached || typeof window === "undefined") return;
    window.addEventListener("catalogue-updated", (event) => {
      if (Array.isArray(event.detail)) {
        this.setProducts(event.detail);
      } else {
        this.fetchRemoteKnowledge();
      }
    });

    window.addEventListener("chatbot-knowledge-updated", () => {
      this.loadCustomStorage();
    });

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) {
        this.loadCustomStorage();
      }
    });

    this.listenersAttached = true;
  }

  setProducts(products) {
    if (Array.isArray(products)) {
      this.dynamicProducts = products;
    }
  }

  /**
   * Teach the chatbot new information dynamically.
   * Immediately saves, indexes, and makes it available to queries!
   */
  learnNewKnowledge({ topic, answer, keywords = [], category = "Newly Learned" }) {
    if (!topic || !answer) throw new Error("Both topic and answer are required to teach the AI.");
    const id = `learned-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const entry = {
      id,
      topic: topic.trim(),
      answer: answer.trim(),
      keywords: Array.isArray(keywords) ? keywords : String(keywords).split(",").map(k => k.trim()).filter(Boolean),
      category: category.trim(),
      dateLearned: new Date().toISOString()
    };
    this.customKnowledge.unshift(entry);
    this.saveCustomStorage();
    return entry;
  }

  deleteLearnedKnowledge(id) {
    this.customKnowledge = this.customKnowledge.filter(item => item.id !== id);
    this.saveCustomStorage();
  }

  getLearnedKnowledgeList() {
    return [...this.customKnowledge];
  }

  /**
   * Full-spectrum query matcher.
   * Matches across:
   * 1. Core 72 FAQs (preserving exact original IDs and test compatibility)
   * 2. Custom Learned Knowledge
   * 3. Product Catalog
   * 4. Spiritual Guide & Vedic Lore
   * 5. Astrological Matrix
   * 6. Store Operations
   */
  findBestMatch(query) {
    const q = normalize(query);
    if (!q) return null;
    const terms = extractWords(q);

    // STEP 0: Check Website Operations & Privileges (stock, ordering, login, access control, secrets)
    const websiteMatch = this.matchWebsiteOperations(q, terms);
    if (websiteMatch) return websiteMatch;

    // STEP 1: Strict Check against core 72 FAQs
    const faqMatch = this.matchCoreFAQs(query, q, terms);
    if (faqMatch) return faqMatch;

    // STEP 2: Check dynamically learned and custom knowledge
    const customMatch = this.matchCustomKnowledge(q, terms);
    if (customMatch) return customMatch;

    // STEP 3: Check Product Catalogue
    const productMatch = this.matchProductCatalogue(q, terms);
    if (productMatch) return productMatch;

    // STEP 4: Check Vedic Astrology & Life Needs
    const astrologyMatch = this.matchAstrologyAndNeeds(q, terms);
    if (astrologyMatch) return astrologyMatch;

    // STEP 5: Check Spiritual Guide & Vedic Deities
    const guideMatch = this.matchSpiritualGuide(q, terms);
    if (guideMatch) return guideMatch;

    // STEP 6: Check Store Information & Contact
    const storeMatch = this.matchStoreInfo(q, terms);
    if (storeMatch) return storeMatch;

    return null;
  }

  matchCoreFAQs(query, q, terms) {
    if (!terms.length) return null;
    const ranked = questions.map(item => {
      const candidates = [item.question, ...(item.aliases || [])];
      const category = normalize(item.category);
      const categoryMatches = terms.filter(term => category.includes(term)).length;
      return candidates.map(candidate => {
        const title = normalize(candidate);
        const titleTerms = extractWords(title);
        const matches = terms.filter(term => titleTerms.some(t => t === term || (term.length > 4 && t.startsWith(term)))).length;
        const sameTerms = titleTerms.length === terms.length && terms.every(term => titleTerms.includes(term));
        const score = (title === q ? 100 : sameTerms ? 60 : title.includes(q) ? 20 : 0) + matches * 4 + categoryMatches;
        return { item, score, matches };
      }).sort((a, b) => b.score - a.score)[0];
    }).sort((a, b) => b.score - a.score);

    const best = ranked[0];
    if (!best || best.matches === 0 || (terms.length >= 3 && best.matches / terms.length < 0.5)) return null;
    if (ranked[1] && best.score === ranked[1].score && best.matches <= 1) return null;
    return best.item;
  }

  matchCustomKnowledge(q, terms) {
    if (!this.customKnowledge.length || !terms.length) return null;
    let best = null;
    let highestScore = 0;

    for (const item of this.customKnowledge) {
      const topicNorm = normalize(item.topic);
      const kwNorms = (item.keywords || []).map(k => normalize(k));
      let score = 0;

      if (topicNorm === q) score += 100;
      else if (topicNorm.includes(q) || q.includes(topicNorm)) score += 50;

      for (const term of terms) {
        if (topicNorm.includes(term)) score += 15;
        if (kwNorms.some(k => k.includes(term))) score += 12;
        if (normalize(item.answer).includes(term)) score += 4;
      }

      if (score > highestScore && score >= 20) {
        highestScore = score;
        best = {
          id: item.id,
          question: item.topic,
          answer: item.answer,
          category: item.category || "Learned Knowledge",
          isCustom: true
        };
      }
    }
    return best;
  }

  matchProductCatalogue(q, terms) {
    const mukhiRegex = /\b(\d+)(?:st|nd|rd|th)?\s*(?:mukhi|face|faceted|faced)\b|\b(?:mukhi|face|faceted|faced)\s*(\d+)\b/;
    const mukhiMatch = q.match(mukhiRegex);
    let mukhiNum = mukhiMatch ? parseInt(mukhiMatch[1] || mukhiMatch[2], 10) : null;
    if (!mukhiNum) {
      for (const [w, n] of Object.entries(WORD_TO_NUMBER)) {
        if (new RegExp(`\\b${w}\\s*(?:mukhi|face|faceted|faced)\\b`).test(q)) {
          mukhiNum = n;
          break;
        }
      }
    }

    // Check specific special beads
    if (q.includes("gauri shankar") || q.includes("gaurishankar")) {
      const s = SPECIAL_BEADS_DIRECTORY["gauri-shankar"];
      return {
        id: "prod-gauri-shankar",
        question: s.name,
        answer: `${s.name} represents ${s.deity}. Ruling Planets: ${s.planet}. Chakra: ${s.chakra}.\n\nBenefits: ${s.benefits}\n\nMantra: ${s.mantra}. We provide 100% genuine Nepal and Java Gauri Shankar beads, verified with lab certificates.`,
        category: "Product Catalogue",
        productUrl: "#shop"
      };
    }

    if (q.includes("ganesh") || q.includes("ganesha")) {
      const s = SPECIAL_BEADS_DIRECTORY["ganesh"];
      return {
        id: "prod-ganesh",
        question: s.name,
        answer: `${s.name} features a natural trunk-like projection representing ${s.deity}. Ruling Planets: ${s.planet}. Chakra: ${s.chakra}.\n\nBenefits: ${s.benefits}\n\nMantra: ${s.mantra}. Recommended for success in new endeavors and student intellect.`,
        category: "Product Catalogue",
        productUrl: "#shop"
      };
    }

    if (q.includes("siddha mala")) {
      const s = SPECIAL_BEADS_DIRECTORY["siddha-mala"];
      return {
        id: "prod-siddha-mala",
        question: s.name,
        answer: `${s.name}: ${s.benefits}\n\nDeities: ${s.deity}. Ruling Planets: ${s.planet}. Crafted using 1 to 14 Mukhi beads with Gauri Shankar and Ganesh Rudraksha in certified Nepal or Java specimens.`,
        category: "Sacred Combinations",
        productUrl: "#shop"
      };
    }

    if (q.includes("indra mala")) {
      const s = SPECIAL_BEADS_DIRECTORY["indra-mala"];
      return {
        id: "prod-indra-mala",
        question: s.name,
        answer: `${s.name}: ${s.benefits}\n\nDeities: ${s.deity}. Includes 1 to 21 Mukhi plus Gauri Shankar and Trijuti. Each bead is individually authenticated and certified with laboratory X-ray.`,
        category: "Sacred Combinations",
        productUrl: "#shop"
      };
    }

    // If specific Mukhi number was queried
    if (mukhiNum && SACRED_MUKHI_DIRECTORY[mukhiNum]) {
      const m = SACRED_MUKHI_DIRECTORY[mukhiNum];
      const prod = this.dynamicProducts.find(p => p.mukhi === mukhiNum) || null;
      const priceText = prod && prod.price ? `Price: $${prod.price}` : "Pricing depends on specimen origin (Nepal / Java) and collector grade.";

      return {
        id: `mukhi-guide-${mukhiNum}`,
        question: `${m.name} Information & Guidance`,
        answer: `**${m.name}**\n\n• **Presiding Deity**: ${m.deity}\n• **Ruling Planet**: ${m.planet}\n• **Chakra**: ${m.chakra}\n• **Beej / Wearing Mantra**: ${m.mantra}\n\n**Traditional Benefits**: ${m.benefits}\n\n**Who Should Wear**: ${m.whoShouldWear}\n\n${priceText} All our beads are 100% natural and certified with X-ray options.`,
        category: "Mukhi Guidance",
        productUrl: prod?.id ? `#product/${encodeURIComponent(prod.id)}` : `#mukhi-${mukhiNum}`
      };
    }

    return null;
  }

  matchSpiritualGuide(q, terms) {
    const asksDeity = q.includes("deity") || q.includes("god") || q.includes("goddess") || q.includes("presiding") || q.includes("who represents") || (q.includes("which") && (q.includes("deity") || q.includes("god") || q.includes("lord")));
    if (asksDeity) {
      const skipDeityWords = new Set(["lord", "god", "goddess", "deva", "devi", "rudra", "shiva", "the"]);
      for (const [num, data] of Object.entries(SACRED_MUKHI_DIRECTORY)) {
        const deityNorm = normalize(data.deity);
        const deityTokens = deityNorm.split(" ").filter(d => d.length > 3 && !skipDeityWords.has(d));
        if (deityTokens.some(d => new RegExp(`\\b${d}\\b`).test(q))) {
          return {
            id: `deity-${num}`,
            question: `${data.deity} Rudraksha`,
            answer: `${data.deity} is the presiding deity of the **${data.name}** (Ruling Planet: ${data.planet}, Mantra: ${data.mantra}).\n\n${data.benefits}`,
            category: "Spiritual Guide"
          };
        }
      }
    }

    // Check if querying by ruling planet
    const asksPlanet = q.includes("planet") || q.includes("graha") || q.includes("ruler") || q.includes("ruling");
    if (asksPlanet) {
      for (const [planetKey, pData] of Object.entries(VEDIC_CORRELATIONS.planets)) {
        if (new RegExp(`\\b${planetKey}\\b`).test(q) || q.includes(normalize(pData.name))) {
          const mukhiNames = pData.mukhis.map(m => `${m} Mukhi`).join(" and ");
          return {
            id: `planet-${planetKey}`,
            question: `Rudraksha for ${pData.name}`,
            answer: `The planet **${pData.name}** is harmonized by wearing the **${mukhiNames} Rudraksha**.\n\nQualities influenced: ${pData.qualities}. Wearing after proper Prana Pratishtha on the planet's auspicious weekday brings maximum harmony.`,
            category: "Astrological Guidance"
          };
        }
      }
    }

    return null;
  }

  matchAstrologyAndNeeds(q, terms) {
    // Check Rashis (Zodiac signs)
    for (const [rashiKey, rData] of Object.entries(VEDIC_CORRELATIONS.rashis)) {
      if (q.includes(rashiKey) || q.includes(normalize(rData.name))) {
        const beads = rData.mukhis.map(m => `${m} Mukhi`).join(" or ");
        return {
          id: `rashi-${rashiKey}`,
          question: `Rudraksha for ${rData.name}`,
          answer: `For **${rData.name}** (ruler: ${rData.ruler}), the recommended sacred Rudraksha beads are **${beads}**.\n\nThese beads strengthen your planetary ruler, support clarity and inner balance, and shield your aura.`,
          category: "Astrology & Horoscope"
        };
      }
    }

    // Need synonyms mapping
    const NEED_SYNONYMS = {
      wealth: ["wealth", "money", "rich", "lakshmi", "financial", "finance", "business", "prosperity", "abundance", "profit"],
      health: ["health", "vitality", "illness", "disease", "healing", "blood pressure", "cure", "fitness", "body", "sick"],
      marriage: ["marriage", "relationship", "love", "spouse", "partner", "marital", "husband", "wife", "wedding", "soulmate"],
      career: ["career", "job", "promotion", "interview", "success", "leadership", "exam", "authority", "executive", "work"],
      education: ["education", "study", "studies", "student", "memory", "intellect", "school", "college", "learning", "wisdom"],
      protection: ["protection", "protect", "evil eye", "negative energy", "negativity", "black magic", "enemies", "court case", "shield", "defense"],
      meditation: ["meditation", "meditate", "spiritual", "peace of mind", "kundalini", "enlightenment", "dhyana", "calm", "inner peace"]
    };

    // Check Specific Life Goals / Needs
    for (const [needKey, nData] of Object.entries(VEDIC_CORRELATIONS.needs)) {
      const syns = NEED_SYNONYMS[needKey] || [needKey];
      if (syns.some(s => q.includes(s))) {
        const beadNames = nData.mukhis.map(m => `${m} Mukhi`).join(", ");
        return {
          id: `need-${needKey}`,
          question: `Best Rudraksha for ${needKey.charAt(0).toUpperCase() + needKey.slice(1)}`,
          answer: `**For ${needKey.charAt(0).toUpperCase() + needKey.slice(1)}**:\n\n${nData.desc}\n\nRecommended: **${beadNames}**${nData.special ? ` and **${nData.special}**` : ""}.\n\nPresiding Deity: ${nData.deity}.`,
          category: "Spiritual Guidance"
        };
      }
    }

    // Check specific Doshas
    if (q.includes("sade sati") || q.includes("shani dosha") || (q.includes("saturn") && (q.includes("dosha") || q.includes("affliction")))) {
      return {
        id: "dosha-shani",
        question: "Rudraksha for Shani Sade Sati",
        answer: "For pacifying Lord Shani (Saturn) and navigating Shani Sade Sati or Dhaiya, the **7 Mukhi Rudraksha** (Mahalakshmi & Saturn) and **14 Mukhi Rudraksha** (Deva Mani / Hanuman) are the supreme recommended beads.",
        category: "Vedic Astrology"
      };
    }

    if (q.includes("kaal sarp") || q.includes("kal sarp") || q.includes("rahu ketu") || q.includes("kalsarp")) {
      return {
        id: "dosha-kaal-sarp",
        question: "Rudraksha for Kaal Sarp Dosha",
        answer: "To mitigate Kaal Sarp Dosha and Rahu-Ketu afflictions, scriptures recommend wearing an **8 Mukhi Rudraksha** (Lord Ganesha / pacifies Rahu) paired with a **9 Mukhi Rudraksha** (Maa Durga / pacifies Ketu).",
        category: "Vedic Astrology"
      };
    }

    if (q.includes("manglik") || q.includes("mars dosha") || q.includes("mangal dosha") || q.includes("kuja dosha")) {
      return {
        id: "dosha-manglik",
        question: "Rudraksha for Manglik Dosha",
        answer: "For pacifying Mars (Mangal) and resolving Manglik dosha, wearing the **3 Mukhi Rudraksha** (Agni Deva) or **11 Mukhi Rudraksha** (Hanumanji) calms aggressive planetary heat and brings peace.",
        category: "Vedic Astrology"
      };
    }

    return null;
  }

  matchWebsiteOperations(q, terms) {
    // 1. Stock & Inventory Availability
    const isStockQuery = (
      q.includes("available for sale") ||
      q.includes("in stock") ||
      q.includes("out of stock") ||
      q.includes("stock status") ||
      q.includes("check stock") ||
      q.includes("real time stock") ||
      q.includes("ready to ship") ||
      q.includes("current inventory") ||
      q.includes("available to order") ||
      q.includes("available to buy") ||
      (q.includes("stock") && (q.includes("ask") || q.includes("bead") || q.includes("item") || q.includes("product") || q.includes("available") || q.includes("have") || q.includes("customer") || q.includes("what if") || q.includes("check"))) ||
      (q.includes("available") && (q.includes("now") || q.includes("sale") || q.includes("buy") || q.includes("purchase") || q.includes("today"))) ||
      (/\b(?:is it|are they|is this)\s+available\b/.test(q))
    );

    if (isStockQuery) {
      return {
        id: "ops-stock-availability",
        question: "Stock & Inventory Availability",
        answer: `**Stock & Inventory Availability**:

• **Live Online Inventory**: All sacred Rudraksha beads, malas, and collector items listed with active pricing in our catalogue are **in stock and available for sale right now**.
• **Exact Specimen Photography**: For natural collector Nepal beads, the high-resolution photo and X-ray shown on each product card is the **exact, one-of-a-kind specimen** you will receive. We do not use generic stock representations for individual beads.
• **Collector & Rare Specimen Inquiries**: If you are looking for ultra-rare beads (15 to 21 Mukhi, Trijuti, Garbh Gauri, or supreme Indra Mala) or specific millimeter dimensions (25mm–35mm+), stock updates continuously. You can confirm instant real-time availability or reserve an unlisted specimen directly via WhatsApp at [${STORE_INFO.whatsapp}](${STORE_INFO.whatsappLink}).`,
        category: "Stock & Inventory",
        productUrl: "#shop"
      };
    }

    // 2. Order Tracking & Status
    const isTrackingQuery = (
      q.includes("track my order") ||
      q.includes("where is my order") ||
      q.includes("order status") ||
      q.includes("track parcel") ||
      q.includes("tracking number") ||
      q.includes("track order") ||
      q.includes("has my order shipped") ||
      (q.includes("track") && (q.includes("order") || q.includes("parcel") || q.includes("package") || q.includes("shipment")))
    );

    if (isTrackingQuery) {
      return {
        id: "ops-order-tracking",
        question: "Order Tracking & Shipment Status",
        answer: `**Order Tracking & Status**:

• **Automated Email Tracking**: As soon as your consecrated Rudraksha is dispatched, a tracking confirmation email with your direct tracking link (Canada Post, UPS, FedEx, or DHL) is sent to you.
• **Instant WhatsApp Tracking**: For real-time updates, you can message our team on WhatsApp at [${STORE_INFO.whatsapp}](${STORE_INFO.whatsappLink}) with your Order ID or Name, and we will immediately check your courier dispatch status.
• **Account Portal**: You can also review your orders under the **"Account"** section in the website header.`,
        category: "Order Tracking"
      };
    }

    // 3. How to Order / Buying Process / Can I Order Now
    const isOrderQuery = !q.includes("track") && !q.includes("status") && (
      q.includes("can i order") ||
      q.includes("order now") ||
      q.includes("how to order") ||
      q.includes("how do i order") ||
      q.includes("how can i order") ||
      q.includes("place an order") ||
      q.includes("place order") ||
      q.includes("how to buy") ||
      q.includes("can i buy") ||
      q.includes("how do i purchase") ||
      q.includes("buying process") ||
      q.includes("ordering process") ||
      q.includes("how to checkout") ||
      q.includes("add to cart") ||
      q.includes("purchase online") ||
      q.includes("order online") ||
      q.includes("buy online") ||
      q.includes("order through whatsapp") ||
      (q.includes("order") && (q.includes("can i") || q.includes("how") || q.includes("step") || q.includes("procedure") || q.includes("guide") || q.includes("start")))
    );

    if (isOrderQuery) {
      return {
        id: "ops-how-to-order",
        question: "How to Place an Order Online",
        answer: `**How to Place an Order Online**:

Yes! You can order directly on our website **right now 24/7**:

1. **Browse & Select**: Explore our authentic Nepal and Java beads in the catalogue. Click on any bead to inspect its high-resolution images, measurements, and certified lab tests.
2. **Add to Sacred Cart**: Click **"Add to Sacred Cart"** or **"Buy Now"** to select your item.
3. **Open Cart & Checkout**: Click the Sacred Cart icon at the top right to review your items, choose your shipping destination, and checkout securely. You can complete your order quickly via **Guest Checkout**—no account creation or password needed!
4. **Order via WhatsApp**: Prefer personal guidance, custom stringing (pure silver / gold capping), or astrological recommendations? You can also order directly with our team on WhatsApp at [${STORE_INFO.whatsapp}](${STORE_INFO.whatsappLink}).`,
        category: "Orders & Purchasing",
        productUrl: "#shop"
      };
    }

    // 3. Login, Registration & User Accounts
    const isLoginAccountQuery = (
      q.includes("login") ||
      q.includes("log in") ||
      q.includes("sign in") ||
      q.includes("signin") ||
      q.includes("register") ||
      q.includes("signup") ||
      q.includes("sign up") ||
      q.includes("create account") ||
      q.includes("account creation") ||
      q.includes("forgot password") ||
      q.includes("reset password") ||
      q.includes("need an account") ||
      q.includes("require an account") ||
      q.includes("guest checkout") ||
      q.includes("my account") ||
      q.includes("my profile") ||
      (q.includes("account") && (q.includes("how") || q.includes("create") || q.includes("access") || q.includes("open") || q.includes("feature") || q.includes("login") || q.includes("available")))
    );

    if (isLoginAccountQuery) {
      return {
        id: "ops-login-account",
        question: "Website Login & Customer Account Access",
        answer: `**Website Login & Account Access**:

• **No Login Required to Order (Guest Checkout)**: You do **not** need to create an account or log in to place an order! Anyone can browse freely and checkout as a guest with just their delivery address and email.
• **Customer Account & Orders**: If you want to check your past order records or customer details, click the **"Account"** button in the top navigation bar or visit [/profile](/profile).
• **No Password Hassle**: There is no complicated password to remember; past purchases and tracking numbers are linked to your confirmed checkout email and phone number.
• **Store Management (Admin)**: The administrative section (\`#admin\`) is strictly reserved for store managers to manage catalogue inventory. General shoppers do not require admin access.`,
        category: "Account & Access"
      };
    }

    // 4. Website Privileges & What Can Be Accessed vs What to Keep Secret
    const isPrivilegesSecretsQuery = (
      q.includes("privilege") ||
      q.includes("previlege") ||
      q.includes("permission") ||
      q.includes("permissions") ||
      q.includes("what can be accessed") ||
      q.includes("what can i access") ||
      q.includes("what features") ||
      q.includes("features available") ||
      q.includes("what to tell") ||
      q.includes("what not to tell") ||
      q.includes("keep secret") ||
      q.includes("confidential") ||
      q.includes("secret") ||
      q.includes("secrets") ||
      q.includes("admin access") ||
      q.includes("admin portal") ||
      q.includes("token") ||
      q.includes("api key") ||
      q.includes("wholesale price") ||
      q.includes("supplier cost") ||
      q.includes("internal data") ||
      (q.includes("access") && (q.includes("user") || q.includes("customer") || q.includes("public") || q.includes("admin")))
    );

    if (isPrivilegesSecretsQuery) {
      return {
        id: "ops-privileges-security",
        question: "Website Privileges, Features & Security Boundaries",
        answer: `**Website Privileges, Features & Security Boundaries**:

✦ **What is Public & Freely Accessible to Every Visitor**:
• **Sacred Vedic Encyclopedia**: 1–21 Mukhi guide, presiding deities, ruling planets, beej mantras, chakras, who should wear, and daily wearing rules.
• **Live Product Catalogue**: Transparent pricing, 360° specimen photography, lab certification details, and origin information (Nepal vs Java).
• **Interactive Kundali Calculator**: Free Birth Chart Rudraksha Recommendation calculator based on Lagna, Moon Rashi, and planetary doshas (#recommendations).
• **Sacred Cart & Guest Checkout**: Multi-currency switcher (USD, CAD, INR, EUR, GBP, AUD) and tracked worldwide shipping.
• **Care & Consecration Wisdom**: Traditional cleaning, oiling, and Prana Pratishtha rituals (#maintenance and #knowledge).
• **Direct Vedic Consultation**: Personal 1-on-1 assistance via WhatsApp (+1 437-267-1257).

🔒 **What is Strictly Confidential & Kept Secret (Store Security Boundary)**:
• **Admin Portal (\`#admin\`)**: Restricted solely to authorized store curators via secure authentication.
• **Administrative Tokens & API Credentials**: GitHub access tokens, backend keys, and database configs are protected.
• **Wholesale Harvest Sourcing & Cost Margins**: Direct farm acquisition contracts in Nepal and internal margins are confidential commercial secrets.
• **Customer Financial Data**: Payment details are encrypted and tokenized through certified banking gateways; no raw credit card details are ever stored or disclosed.`,
        category: "Website Features & Privileges"
      };
    }

    // 5. Payment Methods & Currencies
    const isPaymentQuery = (
      q.includes("payment method") ||
      q.includes("payment methods") ||
      q.includes("how to pay") ||
      q.includes("how do i pay") ||
      q.includes("accepted payment") ||
      q.includes("credit card") ||
      q.includes("debit card") ||
      q.includes("currencies") ||
      q.includes("pay in inr") ||
      q.includes("pay in cad") ||
      q.includes("pay in usd") ||
      q.includes("paypal") ||
      q.includes("interac") ||
      q.includes("apple pay") ||
      (q.includes("currency") && (q.includes("which") || q.includes("what") || q.includes("support") || q.includes("accept") || q.includes("pay") || q.includes("change")))
    );

    if (isPaymentQuery) {
      return {
        id: "ops-payment-currencies",
        question: "Payment Methods & Accepted Currencies",
        answer: `**Payment Methods & Currencies**:

• **Credit & Debit Cards**: We accept Visa, MasterCard, American Express, and major international cards with secure 256-bit SSL encryption.
• **Multiple Currencies Supported**: Use the currency selector at the top of the website to view prices and checkout in **USD ($), CAD ($), INR (₹), EUR (€), GBP (£), or AUD ($)**.
• **Interac e-Transfer**: Canadian customers can also pay directly via Interac e-Transfer upon request.
• **WhatsApp Direct Payment**: You can finalize custom orders and request secure payment links directly on WhatsApp at [${STORE_INFO.whatsapp}](${STORE_INFO.whatsappLink}).`,
        category: "Payment & Currencies"
      };
    }

    // 7. Returns & Guarantees
    const isReturnQuery = (
      q.includes("return policy") ||
      q.includes("refund") ||
      q.includes("exchange policy") ||
      q.includes("can i return") ||
      q.includes("money back") ||
      q.includes("satisfaction guarantee")
    );

    if (isReturnQuery) {
      return {
        id: "ops-returns-guarantee",
        question: "Return Policy & Authenticity Guarantee",
        answer: `**Return Policy & Authenticity Guarantee**:

• **100% Genuine Authenticity Guarantee**: All our beads are natural, untreated, and verified with gemological laboratory certification and X-ray imaging.
• **Damaged or Mismatched Deliveries**: If your order arrives damaged or is not the exact item ordered, please contact us within **7 days** of delivery.
• **Hassle-Free Resolution**: Reach out directly via WhatsApp at [${STORE_INFO.whatsapp}](${STORE_INFO.whatsappLink}) or email **${STORE_INFO.email}** with photos of the parcel, and our team will arrange a replacement or refund promptly.`,
        category: "Returns & Guarantees"
      };
    }

    return null;
  }

  matchStoreInfo(q, terms) {
    if (q.includes("location") || q.includes("where are you") || q.includes("scarborough") || q.includes("address") || q.includes("store located") || q.includes("where is your store") || (q.includes("store") && q.includes("where")) || q.includes("store location")) {
      return {
        id: "store-location",
        question: "Store Location & Physical Presence",
        answer: `Shiva Rudraksha Inc. is based in **${STORE_INFO.location}**. We fulfill orders across Canada, the United States, and worldwide with insured tracked delivery.`,
        category: "Company Information"
      };
    }

    if (q.includes("phone") || q.includes("whatsapp") || q.includes("call") || q.includes("contact number") || q.includes("email") || q.includes("how to contact")) {
      return {
        id: "store-contact",
        question: "How to Contact Shiva Rudraksha Inc.",
        answer: `You can reach our dedicated team directly:\n\n• **WhatsApp (Fastest)**: [${STORE_INFO.whatsapp}](${STORE_INFO.whatsappLink})\n• **Phone / Call**: ${STORE_INFO.phone}\n• **Email**: ${STORE_INFO.email}\n• **Location**: ${STORE_INFO.location}\n\nWe respond personally to every inquiry.`,
        category: "Customer Support"
      };
    }

    if (q.includes("ship") || q.includes("shipping") || q.includes("deliver") || q.includes("delivery") || q.includes("tracking") || q.includes("courier")) {
      return {
        id: "store-shipping",
        question: "Shipping & Worldwide Delivery",
        answer: `**Worldwide Tracked Delivery**: ${STORE_INFO.shipping}\n\n• **Canada**: 2–4 business days\n• **USA**: 3–6 business days\n• **International**: 5–10 business days\n\nAll items are safely boxed in sacred pouches and tracked online.`,
        category: "Orders & Shipping"
      };
    }

    if (q.includes("certificate") || q.includes("xray") || q.includes("x ray") || q.includes("authentic") || q.includes("lab test") || q.includes("genuine") || q.includes("certification")) {
      return {
        id: "store-authenticity",
        question: "Authenticity & Laboratory Verification",
        answer: `**100% Genuine Guarantee**: ${STORE_INFO.authenticity}\n\nWe test each bead for internal seed chambers and natural cleft integrity. Never rely on the water float test or coin spin myth—laboratory certification and X-ray radiography are the only scientific verifications of authentic Rudraksha.`,
        category: "Authenticity Guarantee"
      };
    }

    return null;
  }
}

export const aiKnowledgeEngine = new AIKnowledgeEngine();
if (typeof window !== "undefined") {
  aiKnowledgeEngine.init();
}
