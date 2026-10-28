import "./HalloweenGarland.css";
import { isHalloweenGarlandSeason } from "./isHalloweenGarlandSeason";

type BulbColor = "orange" | "purple" | "lime" | "amber";

type GarlandPiece =
  | { kind: "bulb"; color: BulbColor }
  | { kind: "charm"; glyph: string; label: string };

const PIECES: GarlandPiece[] = [
  { kind: "bulb", color: "orange" },
  { kind: "charm", glyph: "🎃", label: "тыква" },
  { kind: "bulb", color: "purple" },
  { kind: "charm", glyph: "🦇", label: "летучая мышь" },
  { kind: "bulb", color: "lime" },
  { kind: "charm", glyph: "👻", label: "привидение" },
  { kind: "bulb", color: "amber" },
  { kind: "charm", glyph: "🕷️", label: "паук" },
  { kind: "bulb", color: "orange" },
  { kind: "charm", glyph: "🍬", label: "конфета" },
  { kind: "bulb", color: "purple" },
  { kind: "charm", glyph: "💀", label: "череп" },
  { kind: "bulb", color: "lime" },
  { kind: "charm", glyph: "🎃", label: "тыква" },
  { kind: "bulb", color: "amber" },
  { kind: "charm", glyph: "🦇", label: "летучая мышь" },
  { kind: "bulb", color: "orange" },
  { kind: "charm", glyph: "👻", label: "привидение" },
  { kind: "bulb", color: "purple" },
  { kind: "charm", glyph: "🕸️", label: "паутина" },
  { kind: "bulb", color: "lime" },
  { kind: "charm", glyph: "🎃", label: "тыква" },
  { kind: "bulb", color: "amber" },
  { kind: "charm", glyph: "🦇", label: "летучая мышь" },
  { kind: "bulb", color: "orange" },
];

export function HalloweenGarland() {
  if (!isHalloweenGarlandSeason()) return null;

  return (
    <aside
      className="halloween-garland"
      aria-hidden="true"
      role="presentation"
    >
      <div className="halloween-garland__wire" />
      <div className="halloween-garland__row">
        {PIECES.map((piece, index) => (
          <div
            key={`${piece.kind}-${index}`}
            className="halloween-garland__item"
            style={{ animationDelay: `${(index % 7) * -0.35}s` }}
          >
            <span className="halloween-garland__string" />
            {piece.kind === "bulb" ? (
              <span
                className={`halloween-garland__bulb halloween-garland__bulb--${piece.color}`}
              />
            ) : (
              <span
                className="halloween-garland__charm"
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
