import type { Coordinate, PlacedWord } from "word-search-puzzle-generator";
import type { FillwordGridConfig } from "./types";

const ORTHO: [number, number][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const DIAG: [number, number][] = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function deltasFor(config: FillwordGridConfig): [number, number][] {
  return config.allowDiagonal ? [...ORTHO, ...DIAG] : [...ORTHO];
}

function neighbors(
  row: number,
  col: number,
  rows: number,
  cols: number,
  config: FillwordGridConfig,
): Coordinate[] {
  return deltasFor(config)
    .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
    .filter((p) => p.row >= 0 && p.row < rows && p.col >= 0 && p.col < cols);
}

function pathHasTurn(path: Coordinate[]): boolean {
  if (path.length < 3) return false;
  for (let i = 2; i < path.length; i++) {
    const dRow1 = path[i - 1].row - path[i - 2].row;
    const dCol1 = path[i - 1].col - path[i - 2].col;
    const dRow2 = path[i].row - path[i - 1].row;
    const dCol2 = path[i].col - path[i - 1].col;
    if (dRow1 !== dRow2 || dCol1 !== dCol2) return true;
  }
  return false;
}

function canUseCell(
  grid: string[][],
  row: number,
  col: number,
  letter: string,
): boolean {
  // Same rule as the library: empty cell or identical letter is fine.
  const existing = grid[row][col];
  return existing === "" || existing === letter;
}

/**
 * Place a single word as a connected path that may change direction.
 * Returns null if placement failed.
 */
function placeBentWord(
  grid: string[][],
  word: string,
  config: FillwordGridConfig,
  preferTurn: boolean,
): Coordinate[] | null {
  const { rows, cols } = config;
  const starts = shuffle(
    Array.from({ length: rows * cols }, (_, i) => ({
      row: Math.floor(i / cols),
      col: i % cols,
    })),
  );

  for (const start of starts) {
    if (!canUseCell(grid, start.row, start.col, word[0])) {
      continue;
    }

    const path: Coordinate[] = [];
    const used = new Set<string>();

    const key = (p: Coordinate) => `${p.row},${p.col}`;

    const dfs = (index: number, cell: Coordinate): boolean => {
      path.push(cell);
      used.add(key(cell));

      if (index === word.length - 1) {
        const ok = !preferTurn || pathHasTurn(path) || word.length < 3;
        if (!ok) {
          path.pop();
          used.delete(key(cell));
          return false;
        }
        return true;
      }

      const nextLetter = word[index + 1];
      const options = shuffle(
        neighbors(cell.row, cell.col, rows, cols, config).filter((n) => {
          if (used.has(key(n))) return false;
          return canUseCell(grid, n.row, n.col, nextLetter);
        }),
      );

      for (const next of options) {
        if (dfs(index + 1, next)) return true;
      }

      path.pop();
      used.delete(key(cell));
      return false;
    };

    if (dfs(0, start)) {
      return path.map((p) => ({ ...p }));
    }
  }

  return null;
}

/** Generate a puzzle where words may snake / turn between letters. */
export function generateBentGrid(
  words: string[],
  config: FillwordGridConfig,
): { grid: string[][]; placedWords: PlacedWord[] } {
  const { rows, cols } = config;
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ""),
  );
  const placedWords: PlacedWord[] = [];
  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const raw of sorted) {
    const word = raw.toLocaleUpperCase("ru-RU");
    let path =
      word.length >= 3
        ? placeBentWord(grid, word, config, true)
        : null;
    if (!path) path = placeBentWord(grid, word, config, false);
    if (!path) continue;

    path.forEach((coord, i) => {
      grid[coord.row][coord.col] = word[i];
    });
    placedWords.push({ word, path, found: false });
  }

  return { grid, placedWords };
}
