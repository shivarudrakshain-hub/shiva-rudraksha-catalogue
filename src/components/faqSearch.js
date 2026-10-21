import { questions } from "./faqData.js";

export const categories = ["All", ...new Set(questions.map(({ category }) => category))];

export function filterQuestions(query = "", category = "All") {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return questions.filter((item) =>
    (category === "All" || item.category === category) &&
    words.every((word) => `${item.question} ${item.answer} ${item.category} ${(item.aliases || []).join(" ")}`.toLowerCase().includes(word))
  );
}
