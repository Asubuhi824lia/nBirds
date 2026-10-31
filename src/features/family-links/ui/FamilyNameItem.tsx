import { useDraggable, useDroppable } from "@dnd-kit/react";
import type { FamilyEntry, FamilyHighlight } from "../model/types";
import { HighlightedLabel } from "./HighlightedLabel";

type FamilyNameItemProps = {
  entry: FamilyEntry;
  highlights: FamilyHighlight[];
};

export function FamilyNameItem({ entry, highlights }: FamilyNameItemProps) {
  const { ref: dragRef, isDragging } = useDraggable({
    id: `family:${entry.id}`,
    data: { type: "family" as const, familyId: entry.id },
  });
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: `family-drop:${entry.id}`,
    data: { type: "family" as const, familyId: entry.id },
  });

  return (
    <div
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      className={[
        "family-links-name",
        isDragging ? "is-dragging" : "",
        isDropTarget ? "is-drop-target" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <HighlightedLabel text={entry.label} highlights={highlights} />
    </div>
  );
}
