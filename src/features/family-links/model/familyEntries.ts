import { FamiliesGroups } from "@shared/data/FamiliesGroups";
import type { FamilyEntry } from "./types";

function resolveLabel(family: {
  name?: string;
  latin_name?: string;
  alternative_names?: string[];
}): string | null {
  const primary = family.name?.trim();
  if (primary) return primary;
  const alt = family.alternative_names?.[0]?.trim();
  if (alt) return alt;
  return null;
}

function letterOf(label: string): string {
  const ch = label.trim().charAt(0);
  return ch ? ch.toLocaleUpperCase("ru-RU") : "#";
}

/** Flatten FamiliesGroups → unique labeled entries, A→Z by locale. */
export function buildFamilyEntries(): FamilyEntry[] {
  const byId = new Map<string, FamilyEntry>();

  for (const group of FamiliesGroups) {
    for (const family of group.families) {
      const label = resolveLabel(family);
      if (!label) continue;
      const id = family.latin_name?.trim() || label;
      if (byId.has(id)) continue;
      byId.set(id, {
        id,
        label,
        letter: letterOf(label),
      });
    }
  }

  return [...byId.values()].sort((a, b) =>
    a.label.localeCompare(b.label, "ru", { sensitivity: "base" }),
  );
}

export function groupEntriesByLetter(
  entries: FamilyEntry[],
): { letter: string; entries: FamilyEntry[] }[] {
  const map = new Map<string, FamilyEntry[]>();
  for (const entry of entries) {
    const list = map.get(entry.letter) ?? [];
    list.push(entry);
    map.set(entry.letter, list);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "ru", { sensitivity: "base" }))
    .map(([letter, group]) => ({ letter, entries: group }));
}
