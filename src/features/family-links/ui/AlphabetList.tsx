import { groupEntriesByLetter } from "../model/familyEntries";
import type { FamilyEntry, FamilyHighlight } from "../model/types";
import { FamilyNameItem } from "./FamilyNameItem";

type AlphabetListProps = {
  entries: FamilyEntry[];
  listColumns: 1 | 2;
  highlightsForFamily: (familyId: string) => FamilyHighlight[];
};

export function AlphabetList({
  entries,
  listColumns,
  highlightsForFamily,
}: AlphabetListProps) {
  const groups = groupEntriesByLetter(entries);

  return (
    <div
      className={[
        "family-links-main",
        listColumns === 2 ? "is-two-cols" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {groups.map(({ letter, entries: group }) => (
        <section key={letter} className="family-links-letter-block">
          <h2 className="family-links-letter">{letter}</h2>
          <div className="family-links-letter-items">
            {group.map((entry) => (
              <FamilyNameItem
                key={entry.id}
                entry={entry}
                highlights={highlightsForFamily(entry.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
