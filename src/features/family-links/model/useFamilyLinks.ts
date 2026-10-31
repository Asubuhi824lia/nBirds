import { useCallback, useMemo, useState } from "react";
import { findCommonSubstrings, nextBlockColor } from "./commonSubstrings";
import { buildFamilyEntries } from "./familyEntries";
import type {
  ColumnSide,
  FamilyEntry,
  FamilyHighlight,
  SubstringBlock,
} from "./types";

function blockIdFor(substring: string) {
  return `sub:${substring}`;
}

export function useFamilyLinks() {
  const entries = useMemo(() => buildFamilyEntries(), []);
  const entriesById = useMemo(() => {
    const map = new Map<string, FamilyEntry>();
    entries.forEach((e) => map.set(e.id, e));
    return map;
  }, [entries]);

  const [blocks, setBlocks] = useState<SubstringBlock[]>([]);
  const [heightCapped, setHeightCapped] = useState(true);
  const [listColumns, setListColumns] = useState<1 | 2>(1);

  const matchFamilies = useCallback(
    (sourceId: string, targetId: string) => {
      if (sourceId === targetId) return;
      const source = entriesById.get(sourceId);
      const target = entriesById.get(targetId);
      if (!source || !target) return;

      const commons = findCommonSubstrings(source.label, target.label);
      if (!commons.length) return;

      setBlocks((prev) => {
        const next = prev.map((b) => ({
          ...b,
          familyIds: [...b.familyIds],
        }));

        for (const sub of commons) {
          const id = blockIdFor(sub);
          let block = next.find((b) => b.id === id);
          if (!block) {
            block = {
              id,
              substring: sub,
              color: nextBlockColor(next.map((b) => b.color)),
              familyIds: [],
              column: "left",
            };
            next.push(block);
          }
          for (const fid of [sourceId, targetId]) {
            if (!block.familyIds.includes(fid)) block.familyIds.push(fid);
          }
        }
        return next;
      });
    },
    [entriesById],
  );

  const moveBlock = useCallback((blockId: string, column: ColumnSide) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, column } : b)),
    );
  }, []);

  const setBlockColor = useCallback((blockId: string, color: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, color } : b)),
    );
  }, []);

  /** Highlights for a family in the main alphabet list (full colors). */
  const highlightsForFamily = useCallback(
    (familyId: string): FamilyHighlight[] => {
      return blocks
        .filter((b) => b.familyIds.includes(familyId))
        .map((b) => ({ substring: b.substring, color: b.color }));
    },
    [blocks],
  );

  const blocksLeft = useMemo(
    () => blocks.filter((b) => b.column === "left"),
    [blocks],
  );
  const blocksRight = useMemo(
    () => blocks.filter((b) => b.column === "right"),
    [blocks],
  );

  return {
    entries,
    entriesById,
    blocks,
    blocksLeft,
    blocksRight,
    heightCapped,
    setHeightCapped,
    listColumns,
    setListColumns,
    matchFamilies,
    moveBlock,
    setBlockColor,
    highlightsForFamily,
  };
}
