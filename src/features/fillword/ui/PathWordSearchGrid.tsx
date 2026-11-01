import { useCallback, useEffect, useState } from "react";
import type { Coordinate, PlacedWord } from "word-search-puzzle-generator";

type PathWordSearchGridProps = {
  grid: string[][];
  placedWords: PlacedWord[];
  onWordFound: (word: string) => void;
  /** Allow diagonal steps while tracing (matches placement when allowDiagonal). */
  allowDiagonal?: boolean;
  classNames?: {
    container?: string;
    grid?: string;
    row?: string;
    cell?: string;
    cellSelected?: string;
    cellFound?: string;
  };
};

function isAdjacent(
  a: Coordinate,
  b: Coordinate,
  allowDiagonal: boolean,
): boolean {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  if (dr === 0 && dc === 0) return false;
  if (allowDiagonal) return dr <= 1 && dc <= 1;
  return dr + dc === 1;
}

function pathsEqual(a: Coordinate[], b: Coordinate[]) {
  if (a.length !== b.length) return false;
  return a.every(
    (c, i) => c.row === b[i].row && c.col === b[i].col,
  );
}

/**
 * Selection grid for bent/snake words: paint a path through adjacent cells.
 * Uses the same `PlacedWord.path` contract as the library.
 */
export function PathWordSearchGrid({
  grid,
  placedWords,
  onWordFound,
  allowDiagonal = false,
  classNames = {},
}: PathWordSearchGridProps) {
  const [selecting, setSelecting] = useState(false);
  const [path, setPath] = useState<Coordinate[]>([]);

  const isInPath = (r: number, c: number, list: Coordinate[]) =>
    list.some((p) => p.row === r && p.col === c);

  const cellClass = (r: number, c: number) => {
    const base = classNames.cell ?? "";
    if (isInPath(r, c, path)) {
      return `${base} ${classNames.cellSelected ?? ""}`.trim();
    }
    const found = placedWords.some(
      (pw) => pw.found && isInPath(r, c, pw.path),
    );
    if (found) return `${base} ${classNames.cellFound ?? ""}`.trim();
    return base;
  };

  const finish = useCallback(() => {
    if (path.length > 1) {
      for (const pw of placedWords) {
        if (pw.found) continue;
        const reversed = [...pw.path].reverse();
        if (pathsEqual(path, pw.path) || pathsEqual(path, reversed)) {
          onWordFound(pw.word);
          break;
        }
      }
    }
    setSelecting(false);
    setPath([]);
  }, [path, placedWords, onWordFound]);

  useEffect(() => {
    const onUp = () => {
      if (selecting) finish();
    };
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, [selecting, finish]);

  const startAt = (row: number, col: number) => {
    if (!grid[row]?.[col]) return;
    setSelecting(true);
    setPath([{ row, col }]);
  };

  const moveTo = (row: number, col: number) => {
    if (!selecting) return;
    if (!grid[row]?.[col]) return;

    setPath((prev) => {
      if (!prev.length) return [{ row, col }];
      const last = prev[prev.length - 1];
      if (last.row === row && last.col === col) return prev;

      // Step back onto the previous cell → undo
      if (
        prev.length >= 2 &&
        prev[prev.length - 2].row === row &&
        prev[prev.length - 2].col === col
      ) {
        return prev.slice(0, -1);
      }

      if (prev.some((p) => p.row === row && p.col === col)) return prev;
      if (!isAdjacent(last, { row, col }, allowDiagonal)) return prev;
      return [...prev, { row, col }];
    });
  };

  const numCols = grid[0]?.length ?? 0;

  return (
    <div
      className={classNames.container}
      onTouchEnd={finish}
      style={{ touchAction: "none" }}
    >
      <div
        className={classNames.grid}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, min-content)`,
        }}
        role="grid"
      >
        {grid.map((row, rIndex) => (
          <div
            key={`row-${rIndex}`}
            role="row"
            style={{ display: "contents" }}
            className={classNames.row}
          >
            {row.map((letter, cIndex) => (
              <div
                key={`${rIndex}-${cIndex}`}
                data-row={rIndex}
                data-col={cIndex}
                role="gridcell"
                className={cellClass(rIndex, cIndex)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onMouseDown={() => startAt(rIndex, cIndex)}
                onMouseEnter={() => moveTo(rIndex, cIndex)}
                onTouchStart={() => startAt(rIndex, cIndex)}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const el = document.elementFromPoint(
                    touch.clientX,
                    touch.clientY,
                  );
                  const rowAttr = el?.getAttribute("data-row");
                  const colAttr = el?.getAttribute("data-col");
                  if (rowAttr != null && colAttr != null) {
                    moveTo(Number(rowAttr), Number(colAttr));
                  }
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
