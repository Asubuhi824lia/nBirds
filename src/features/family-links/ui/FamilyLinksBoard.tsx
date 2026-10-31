import { DragDropProvider } from "@dnd-kit/react";
import type { ColumnSide, FamilyEntry, FamilyHighlight, SubstringBlock } from "../model/types";
import { AlphabetList } from "./AlphabetList";
import { SideColumn } from "./SideColumn";

type FamilyLinksBoardProps = {
  entries: FamilyEntry[];
  entriesById: Map<string, FamilyEntry>;
  blocksLeft: SubstringBlock[];
  blocksRight: SubstringBlock[];
  heightCapped: boolean;
  onHeightCappedChange: (capped: boolean) => void;
  listColumns: 1 | 2;
  onMatchFamilies: (sourceId: string, targetId: string) => void;
  onMoveBlock: (blockId: string, column: ColumnSide) => void;
  onColorChange: (blockId: string, color: string) => void;
  highlightsForFamily: (familyId: string) => FamilyHighlight[];
};

export function FamilyLinksBoard({
  entries,
  entriesById,
  blocksLeft,
  blocksRight,
  heightCapped,
  onHeightCappedChange,
  listColumns,
  onMatchFamilies,
  onMoveBlock,
  onColorChange,
  highlightsForFamily,
}: FamilyLinksBoardProps) {
  const handleDragEnd = (event: {
    canceled: boolean;
    operation: {
      source?: {
        id?: string | number;
        data?: {
          type?: string;
          familyId?: string;
          blockId?: string;
        };
      } | null;
      target?: {
        id?: string | number;
        data?: {
          type?: string;
          familyId?: string;
          column?: ColumnSide;
        };
      } | null;
    };
  }) => {
    if (event.canceled) return;
    const source = event.operation.source;
    const target = event.operation.target;
    if (!source?.data || !target?.data) return;

    if (source.data.type === "family" && target.data.type === "family") {
      const sourceId = source.data.familyId;
      const targetId = target.data.familyId;
      if (sourceId && targetId) onMatchFamilies(sourceId, targetId);
      return;
    }

    if (source.data.type === "block" && target.data.type === "column") {
      const blockId = source.data.blockId ?? String(source.id ?? "");
      const column = target.data.column;
      if (blockId && column) onMoveBlock(blockId, column);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="family-links-layout">
        <SideColumn
          side="left"
          title="Колонка слева"
          blocks={blocksLeft}
          entriesById={entriesById}
          heightCapped={heightCapped}
          onHeightCappedChange={onHeightCappedChange}
          onColorChange={onColorChange}
        />
        <AlphabetList
          entries={entries}
          listColumns={listColumns}
          highlightsForFamily={highlightsForFamily}
        />
        <SideColumn
          side="right"
          title="Колонка справа"
          blocks={blocksRight}
          entriesById={entriesById}
          heightCapped={heightCapped}
          onHeightCappedChange={onHeightCappedChange}
          onColorChange={onColorChange}
        />
      </div>
    </DragDropProvider>
  );
}
