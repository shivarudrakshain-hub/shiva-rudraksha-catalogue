import React from "react";
import "./FAQAnswer.css";

function renderFormattedInline(str) {
  if (!str) return str;
  // Regex to split on **bold** and [label](url)
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = str.split(regex);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const isExternal = linkMatch[2].startsWith("http") || linkMatch[2].startsWith("mailto:") || linkMatch[2].startsWith("tel:");
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target={isExternal && !linkMatch[2].startsWith("mailto:") ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export default function FAQAnswer({ text }) {
  if (!text) return null;
  return (
    <div className="faq-answer">
      {text.split(/\n\s*\n/).map((block, index) => {
        const lines = block.split("\n").filter(l => l.trim().length > 0);
        if (lines.length > 0 && lines.every(line => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index}>
              {lines.map((line, step) => (
                <li key={step}>{renderFormattedInline(line.replace(/^\d+\.\s*/, ""))}</li>
              ))}
            </ol>
          );
        }
        if (lines.length > 0 && lines.every(line => /^[•\-\*✦🔒]\s/.test(line))) {
          return (
            <ul key={index}>
              {lines.map((line, step) => (
                <li key={step}>{renderFormattedInline(line.replace(/^[•\-\*✦🔒]\s*/, ""))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index}>
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {renderFormattedInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
