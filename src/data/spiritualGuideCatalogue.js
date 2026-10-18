import guideEntries from "../../public/data/rudraksha-guide.json";

/**
 * Sacred Spiritual Guide Catalogue & Vedic Template Data
 * Extracted and modeled directly from the reference PDF (DOC-20260926-WA0028.pdf)
 * 
 * Each product entry follows the exact 2-card brochure format:
 *  - Card 1: Sacred Identity, Deity Illustration & Vedic Specifications (Associated God, Planet, Nakshatra, Chakra, Who Should Wear, When to Wear, Mantra)
 *  - Card 2: Traditional Benefits with 6 Sacred Medallion Icons & Explanations
 */

export const spiritualGuideData = {
  1: {
    mukhi: 1,
    title: "1 MUKHI RUDRAKSHA",
    subtitle: "Symbol of Supreme Consciousness",
    brand: "Shiva Rudraksha Inc.",
    tagline: "CONNECT ✦ BALANCE ✦ TRANSFORM",
    motto: "Ancient Wisdom for a Better Tomorrow",
    deityMantraSanskrit: "ॐ नमः शिवाय",
    deityMantraEnglish: "OM NAMAH SHIVAYA",
    deityArt: "images/spiritual-guide/1-mukhi/shiva-banner.avif",
    brochureCards: {
      specsCard: "images/spiritual-guide/1-mukhi/card1-specs.avif",
      benefitsCard: "images/spiritual-guide/1-mukhi/card2-benefits.avif",
      fullSpread: "images/spiritual-guide/1-mukhi/full-spread.avif",
    },
    specs: [
      {
        id: "god",
        label: "Associated God",
        value: "Lord Shiva",
        icon: "trishul",
      },
      {
        id: "planet",
        label: "Planet",
        value: "Sun (Surya)",
        icon: "sun",
      },
      {
        id: "nakshatra",
        label: "Nakshatra",
        value: "Krittika • Uttara Phalguni • Uttara Ashadha",
        icon: "star",
      },
      {
        id: "chakra",
        label: "Chakra",
        value: "Sahasrara (Crown Chakra)",
        icon: "lotus",
      },
      {
        id: "wearer",
        label: "Who Should Wear",
        value: "Spiritual seekers, meditators, leaders and those seeking higher purpose and inner clarity.",
        icon: "people",
      },
      {
        id: "when",
        label: "When to Wear",
        value: "Monday, preferably in the morning.",
        icon: "calendar",
      },
      {
        id: "mantra",
        label: "Mantra",
        value: "Om Namah Shivaya – 108 times.",
        icon: "om",
      },
    ],
    card1Footer: "HIGHER AWARENESS ✦ A BRIGHTER LIFE",
    benefitsTitle: "1 MUKHI RUDRAKSHA",
    benefitsSubtitle: "Traditional Benefits",
    benefits: [
      {
        id: 1,
        icon: "shiva_dhyana",
        title: "DEEPER CONNECTION WITH LORD SHIVA",
        text: "Considered the most sacred Rudraksha, it is believed to strengthen your spiritual connection with Lord Shiva and support higher consciousness.",
      },
      {
        id: 2,
        icon: "mental_focus",
        title: "ENHANCES MENTAL FOCUS AND CLARITY",
        text: "Helps in concentration, clear thinking and decision-making, allowing you to stay focused on what truly matters.",
      },
      {
        id: 3,
        icon: "deep_meditation",
        title: "SUPPORTS DEEP MEDITATION",
        text: "Traditionally worn to calm the mind, reduce distractions and help you attain deeper meditative states.",
      },
      {
        id: 4,
        icon: "leadership_sun",
        title: "BUILDS CONFIDENCE AND LEADERSHIP",
        text: "Associated with the energy of the Sun, it is believed to enhance self-confidence, willpower and leadership qualities, helping you take purposeful actions in life.",
      },
      {
        id: 5,
        icon: "detachment_mountain",
        title: "HELPS IN DETACHMENT AND WISDOM",
        text: "Supports letting go of ego, negative patterns and worldly attachments, guiding you towards a more meaningful and purposeful life.",
      },
      {
        id: 6,
        icon: "inner_peace_tree",
        title: "BRINGS INNER PEACE AND FULFILLMENT",
        text: "Helps in emotional balance, self-awareness and a sense of contentment, allowing you to experience a calmer, more centered and joyful state of being.",
      },
    ],
    card2Footer: "OM NAMAH SHIVAYA",
  },

  2: {
    mukhi: 2,
    title: "2 MUKHI RUDRAKSHA",
    subtitle: "Symbol of Unity and Harmony",
    brand: "Shiva Rudraksha Inc.",
    tagline: "CONNECT ✦ BALANCE ✦ TRANSFORM",
    motto: "Ancient Wisdom for a Better Tomorrow",
    deityMantraSanskrit: "ॐ नमः शिवाय",
    deityMantraEnglish: "OM NAMAH SHIVAYA",
    deityArt: "images/spiritual-guide/2-mukhi/deity-banner.avif",
    brochureCards: {
      specsCard: "images/spiritual-guide/2-mukhi/card1-specs.avif",
      benefitsCard: "images/spiritual-guide/2-mukhi/card2-benefits.avif",
      fullSpread: "images/spiritual-guide/2-mukhi/full-spread.avif",
    },
    specs: [
      {
        id: "god",
        label: "Associated God",
        value: "Ardhanarishvara (Lord Shiva and Goddess Shakti)",
        icon: "trishul",
      },
      {
        id: "planet",
        label: "Planet",
        value: "Moon (Chandra)",
        icon: "moon",
      },
      {
        id: "nakshatra",
        label: "Nakshatra",
        value: "Rohini • Hasta • Shravana",
        icon: "star",
      },
      {
        id: "chakra",
        label: "Chakra",
        value: "Swadhisthana (Sacral Chakra)",
        icon: "lotus",
      },
      {
        id: "wearer",
        label: "Who Should Wear",
        value: "Those seeking harmony in relationships, emotional balance, unity and inner stability.",
        icon: "people",
      },
      {
        id: "when",
        label: "When to Wear",
        value: "Monday, preferably in the morning.",
        icon: "calendar",
      },
      {
        id: "mantra",
        label: "Mantra",
        value: "Om Namah Shivaya – 108 times.",
        icon: "om",
      },
    ],
    card1Footer: "HIGHER AWARENESS ✦ A BRIGHTER LIFE",
    benefitsTitle: "2 MUKHI RUDRAKSHA",
    benefitsSubtitle: "Traditional Benefits",
    benefits: [
      {
        id: 1,
        icon: "harmony_couple",
        title: "MARRIAGE & RELATIONSHIP HARMONY",
        text: "Traditionally associated with strengthening understanding, emotional connection and harmony between husband and wife or partners.",
      },
      {
        id: 2,
        icon: "shiva_shakti",
        title: "SHIVA–SHAKTI BALANCE",
        text: "Represents Ardhanarishvara, the unified form of Shiva and Shakti, symbolizing balance between complementary masculine and feminine energies.",
      },
      {
        id: 3,
        icon: "emotional_stability",
        title: "EMOTIONAL STABILITY",
        text: "Because of its traditional association with the Moon, it is worn to support emotional steadiness and help calm an unsettled or fluctuating mind.",
      },
      {
        id: 4,
        icon: "heal_conflict",
        title: "HEALS CONFLICT & DISCONNECTION",
        text: "Traditionally chosen when there is misunderstanding, emotional distance or repeated conflict in close relationships, with the intention of restoring unity.",
      },
      {
        id: 5,
        icon: "family_bonding",
        title: "FAMILY BONDING & TOGETHERNESS",
        text: "Worn with the intention of encouraging mutual understanding, compassion and stronger bonds within the family.",
      },
      {
        id: 6,
        icon: "inner_unity",
        title: "INNER UNITY & SELF-ACCEPTANCE",
        text: "Beyond relationships, the two faces symbolize bringing opposing aspects of oneself into harmony, supporting greater self-acceptance and inner integration.",
      },
    ],
    card2Footer: "OM NAMAH SHIVAYA",
  },
};

/** Resolve only documented product-specific guidance; never substitute another bead. */
export function getSpiritualGuideForProduct(product) {
  if (!product) return null;
  const match = String(product.id || product.slug || product.name || "").match(/^(\d+)[-\s]*mukhi/i);
  const num = Number(product.mukhi) || (match ? Number(match[1]) : null);
  if (!num) return null;
  if (spiritualGuideData[num]) return spiritualGuideData[num];
  const entry = guideEntries.find(item => Number(item.mukhi) === num && item.section === "mukhi");
  if (!entry) return null;
  const name = entry.title;
  return {
    mukhi: num,
    title: name.toUpperCase(),
    subtitle: "Traditional Vedic Associations",
    brand: "Shiva Rudraksha Inc.",
    tagline: "CONNECT ✦ BALANCE ✦ TRANSFORM",
    motto: "Ancient Wisdom for a Better Tomorrow",
    deityMantraSanskrit: "",
    deityMantraEnglish: entry.mantra,
    deityArt: `images/spiritual-guide/${num}-mukhi/deity-banner.avif`,
    brochureCards: {
      specsCard: `images/spiritual-guide/${num}-mukhi/card1-specs.avif`,
      benefitsCard: `images/spiritual-guide/${num}-mukhi/card2-benefits.avif`,
      fullSpread: `images/spiritual-guide/${num}-mukhi/full-spread.avif`,
    },
    specs: [
      { id: "god", label: "Associated God", value: entry.deity, icon: "trishul" },
      { id: "planet", label: "Planet", value: entry.planet, icon: "sun" },
      { id: "origin", label: "Origin", value: product.origin || entry.origin, icon: "star" },
      { id: "chakra", label: "Chakra", value: entry.chakra, icon: "lotus" },
      { id: "nakshatra", label: "Nakshatra", value: entry.nakshatra, icon: "star" },
      { id: "wearer", label: "Who Should Wear", value: entry.whoShouldWear.join(" "), icon: "people" },
      { id: "when", label: "Wearing Guidance", value: entry.wearingRules[0], icon: "calendar" },
      { id: "mantra", label: "Mantra", value: entry.mantra, icon: "om" },
    ].filter(item => item.value),
    card1Footer: entry.mantra,
    benefitsTitle: name.toUpperCase(),
    benefitsSubtitle: "Traditional Benefits",
    benefits: entry.benefitDetails.map((benefit, index) => ({
      id: index + 1,
      icon: ["mental_focus", "deep_meditation", "inner_peace_tree"][index % 3],
      title: benefit.title.toUpperCase(),
      text: benefit.text,
    })),
    card2Footer: entry.mantra,
  };
}
