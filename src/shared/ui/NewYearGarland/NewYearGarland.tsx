import "./NewYearGarland.css";
import { isNewYearGarlandSeason } from "./isNewYearGarlandSeason";

type BulbColor = "red" | "green" | "gold" | "blue";

type GarlandPiece =
  | { kind: "bulb"; color: BulbColor }
  | { kind: "charm"; glyph: string; label: string };

const PIECES: GarlandPiece[] = [
  { kind: "bulb", color: "red" },
  { kind: "charm", glyph: "🎄", label: "ёлка" },
  { kind: "bulb", color: "green" },
  { kind: "charm", glyph: "🎁", label: "снеговик" },
  { kind: "bulb", color: "gold" },
  { kind: "charm", glyph: "❄️", label: "снежинка" },
  { kind: "bulb", color: "blue" },
  { kind: "charm", glyph: "⭐", label: "звезда" },
  { kind: "bulb", color: "red" },
  { kind: "charm", glyph: "☃️", label: "снеговик" },
  { kind: "bulb", color: "green" },
  { kind: "charm", glyph: "🎅", label: "Дед Мороз" },
  { kind: "bulb", color: "gold" },
  { kind: "charm", glyph: "🎄", label: "ёлка" },
  { kind: "bulb", color: "blue" },
  { kind: "charm", glyph: "🦌", label: "снеговик" },
  { kind: "bulb", color: "red" },
  { kind: "charm", glyph: "✨", label: "блёстки" },
  { kind: "bulb", color: "green" },
  { kind: "charm", glyph: "☃️", label: "снеговик" },
  { kind: "bulb", color: "gold" },
  { kind: "charm", glyph: "🎁", label: "подарок" },
  { kind: "bulb", color: "blue" },
  { kind: "charm", glyph: "⭐", label: "звезда" },
  { kind: "bulb", color: "red" },
];

export function NewYearGarland() {
  if (!isNewYearGarlandSeason()) return null;

  return (
    <aside
      className="newyear-garland"
      aria-hidden="true"
      role="presentation"
    >
      <div className="newyear-garland__wire" />
      <div className="newyear-garland__row">
        {PIECES.map((piece, index) => (
          <div
            key={`${piece.kind}-${index}`}
            className="newyear-garland__item"
            style={{ animationDelay: `${(index % 7) * -0.35}s` }}
          >
            <span className="newyear-garland__string" />
            {piece.kind === "bulb" ? (
              <span
                className={`newyear-garland__bulb newyear-garland__bulb--${piece.color}`}
              />
            ) : (
              <span
                className="newyear-garland__charm"
                title={piece.label}
              >
                {piece.glyph}
              </span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
