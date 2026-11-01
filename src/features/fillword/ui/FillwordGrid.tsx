import { WordSearchGrid, type PlacedWord } from "word-search-puzzle-generator";
import { PathWordSearchGrid } from "./PathWordSearchGrid";

const GRID_CLASS_NAMES = {
  container: "fillword-grid",
  grid: "fillword-grid",
  row: "fillword-row",
  cell: "fillword-cell",
  cellSelected: "fillword-cell-selected",
  cellFound: "fillword-cell-found",
} as const;

type FillwordGridProps = {
  grid: string[][];
  placedWords: PlacedWord[];
  onWordFound: (word: string) => void;
  allowTurns?: boolean;
  allowDiagonal?: boolean;
  remountKey?: string | number;
};

/** Straight lines via library grid; bent paths via our PathWordSearchGrid. */
export function FillwordGrid({
  grid,
  placedWords,
  onWordFound,
  allowTurns = false,
  allowDiagonal = false,
  remountKey,
}: FillwordGridProps) {
  if (allowTurns) {
    return (
      <PathWordSearchGrid
        key={remountKey}
        grid={grid}
        placedWords={placedWords}
        onWordFound={onWordFound}
        allowDiagonal={allowDiagonal}
        classNames={GRID_CLASS_NAMES}
      />
    );
  }

  return (
    <WordSearchGrid
      key={remountKey}
      grid={grid}
      placedWords={placedWords}
      onWordFound={onWordFound}
      classNames={GRID_CLASS_NAMES}
    />
  );
}
