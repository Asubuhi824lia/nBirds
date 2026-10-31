export type FamilyEntry = {
  id: string;
  label: string;
  letter: string;
};

export type ColumnSide = "left" | "right";

export type SubstringBlock = {
  id: string;
  /** Normalized (lowercased) key */
  substring: string;
  color: string;
  familyIds: string[];
  column: ColumnSide;
};

export type FamilyHighlight = {
  substring: string;
  color: string;
  faded?: boolean;
};
