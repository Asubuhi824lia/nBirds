import type { MatchOption } from "./types";

/** Validate by option id → expected blockId (primary). */
export function isOptionMatchForBlock(option: MatchOption, blockId: string): boolean {
  return option.blockId === blockId;
}

/** Optional content check: label must be non-empty, 1–4 words. */
export function isValidOptionLabel(label: string): boolean {
  const words = label.trim().split(/\s+/).filter(Boolean);
  return words.length >= 1 && words.length <= 4;
}

export function sortOptionsAlphabetically(options: MatchOption[]): MatchOption[] {
  return [...options].sort((a, b) => {
    if (a.imageSortKey || b.imageSortKey) {
      return (a.imageSortKey ?? a.label).localeCompare(b.imageSortKey ?? b.label, "ru", {
        sensitivity: "base",
      });
    }
    return a.label.localeCompare(b.label, "ru", { sensitivity: "base" });
  });
}
