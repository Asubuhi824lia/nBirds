import { useDraggable } from "@dnd-kit/react";
import type { FamilyEntry, SubstringBlock } from "../model/types";
import { HighlightedLabel } from "./HighlightedLabel";

type SubstringBlockCardProps = {
  block: SubstringBlock;
  families: FamilyEntry[];
  faded?: boolean;
  onColorChange: (color: string) => void;
};

export function SubstringBlockCard({
  block,
  families,
  faded = false,
  onColorChange,
}: SubstringBlockCardProps) {
  const { ref, isDragging } = useDraggable({
    id: block.id,
    data: { type: "block" as const, blockId: block.id },
  });

  const alpha = faded ? 0.45 : 1;
  const borderColor = faded
    ? hexToRgba(block.color, 0.45)
    : block.color;

  return (
    <div
      ref={ref}
      className={`family-links-block${isDragging ? " is-dragging" : ""}`}
      style={{ borderColor, opacity: faded ? 0.72 : 1 }}
    >
      <div className="family-links-block__header">
        <span
          className="family-links-block__sub"
          style={{ color: faded ? hexToRgba(block.color, 0.7) : block.color }}
        >
          {block.substring}
        </span>
        <input
          type="color"
          className="family-links-block__color"
          value={block.color}
          aria-label="Цвет подстроки"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
      <div className="family-links-block__body">
        {families.map((family) => (
          <div key={family.id} className="family-links-block__item">
            <HighlightedLabel
              text={family.label}
              highlights={[{ substring: block.substring, color: block.color }]}
              colorAlpha={alpha}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return hex;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
