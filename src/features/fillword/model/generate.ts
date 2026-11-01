import { generateGrid, type GridConfig } from "word-search-puzzle-generator";
import { DEFAULT_GRID_CONFIG } from "./config";
import { fillBlankLetters, normalizeWord } from "./normalize";
import type { GeneratedPuzzle } from "./types";

export { DEFAULT_GRID_CONFIG };

export function createFillwordPuzzle(
  words: string[],
  config: GridConfig = DEFAULT_GRID_CONFIG,
): GeneratedPuzzle {
  const normalized = words.map(normalizeWord).filter((w) => w.length >= 2);
  const maxLen = Math.max(...normalized.map((w) => w.length), 1);
  const safeConfig: GridConfig = {
    ...config,
    rows: Math.max(config.rows, maxLen),
    cols: Math.max(config.cols, maxLen),
    fillBlanks: false,
  };

  const { grid, placedWords } = generateGrid(normalized, safeConfig);
  return {
    grid: fillBlankLetters(grid, normalized),
    placedWords,
    words: placedWords.map((p) => p.word),
    config: safeConfig,
  };
}
