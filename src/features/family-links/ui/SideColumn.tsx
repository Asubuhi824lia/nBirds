import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDroppable } from "@dnd-kit/react";
import type { ColumnSide, FamilyEntry, SubstringBlock } from "../model/types";
import { SubstringBlockCard } from "./SubstringBlockCard";

type SideColumnProps = {
  side: ColumnSide;
  title: string;
  blocks: SubstringBlock[];
  entriesById: Map<string, FamilyEntry>;
  heightCapped: boolean;
  onHeightCappedChange: (capped: boolean) => void;
  onColorChange: (blockId: string, color: string) => void;
};

export function SideColumn({
  side,
  title,
  blocks,
  entriesById,
  heightCapped,
  onHeightCappedChange,
  onColorChange,
}: SideColumnProps) {
  const { ref, isDropTarget } = useDroppable({
    id: `column:${side}`,
    data: { type: "column" as const, column: side },
  });

  return (
    <aside
      ref={ref}
      className={[
        "family-links-side",
        heightCapped ? "is-sticky" : "is-flow",
        isDropTarget ? "is-drop-target" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="family-links-side__header">
        <span className="family-links-side__title">{title}</span>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={heightCapped ? "capped" : "free"}
          onChange={(_, value) => {
            if (value === "capped") onHeightCappedChange(true);
            if (value === "free") onHeightCappedChange(false);
          }}
          aria-label="Ограничение высоты колонок"
        >
          <ToggleButton value="capped" aria-label="Ограничить высоту">
            ↕
          </ToggleButton>
          <ToggleButton value="free" aria-label="Без ограничения высоты">
            ∞
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="family-links-side__body">
        {blocks.map((block) => {
          const families = block.familyIds
            .map((id) => entriesById.get(id))
            .filter((e): e is FamilyEntry => Boolean(e));
          return (
            <SubstringBlockCard
              key={block.id}
              block={block}
              families={families}
              faded={side === "right"}
              onColorChange={(color) => onColorChange(block.id, color)}
            />
          );
        })}
      </div>
    </aside>
  );
}
