import Highlighter from "react-highlight-words";
import type { FamilyHighlight } from "../model/types";

type HighlightedLabelProps = {
  text: string;
  highlights: FamilyHighlight[];
  /** Extra opacity for right-column faded look (0–1). */
  colorAlpha?: number;
};

function withAlpha(hex: string, alpha: number): string {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return hex;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function HighlightedLabel({
  text,
  highlights,
  colorAlpha = 1,
}: HighlightedLabelProps) {
  if (!highlights.length) {
    return <>{text}</>;
  }

  const searchWords = highlights.map((h) => h.substring);
  const colorByWord = new Map(
    highlights.map((h) => [h.substring.toLocaleLowerCase("ru-RU"), h.color]),
  );

  return (
    <Highlighter
      searchWords={searchWords}
      textToHighlight={text}
      autoEscape
      caseSensitive={false}
      highlightTag={({ children }) => {
        const chunk = String(children).toLocaleLowerCase("ru-RU");
        const color = colorByWord.get(chunk) ?? "#9b5de5";
        return (
          <mark
            style={{
              backgroundColor: withAlpha(color, 0.35 * colorAlpha),
              color: "inherit",
              padding: "0 2px",
              borderRadius: 2,
              boxShadow: `inset 0 -2px 0 ${withAlpha(color, colorAlpha)}`,
            }}
          >
            {children}
          </mark>
        );
      }}
    />
  );
}
