import "./FAQAnswer.css";

export default function FAQAnswer({ text }) {
  return <div className="faq-answer">
    {text.split(/\n\s*\n/).map((block, index) => {
      const lines = block.split("\n");
      if (lines.every(line => /^\d+\.\s/.test(line))) {
        return <ol key={index}>{lines.map((line, step) => <li key={step}>{line.replace(/^\d+\.\s/, "")}</li>)}</ol>;
      }
      return <p key={index}>{block}</p>;
    })}
  </div>;
}
