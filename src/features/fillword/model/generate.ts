import { generateGrid } from "word-search-puzzle-generator";
import { generateBentGrid } from "./bentGenerate";
import { DEFAULT_GRID_CONFIG } from "./config";
import { fillBlankLetters, normalizeWord } from "./normalize";
import type { FillwordGridConfig, GeneratedPuzzle } from "./types";

export { DEFAULT_GRID_CONFIG };

/** Library / UI floor for grid sides. */
export const MIN_GRID_SIDE = 5;
export const MAX_GRID_SIDE = 25;

/** Longest normalized word length (at least 1). */
export function longestWordLength(words: string[]): number {
  const normalized = words.map(normalizeWord).filter((w) => w.length >= 2);
  return Math.max(...normalized.map((w) => w.length), 1);
}

/**
 * Minimum rows/cols for placement.
 * Straight mode: at least the longest word (and library min 5).
 * Bent mode: only the library/UI floor — words can snake.
 */
export function minGridSideForWords(
  words: string[],
  allowTurns = false,
): number {
  if (allowTurns) return MIN_GRID_SIDE;
  return Math.max(MIN_GRID_SIDE, longestWordLength(words));
}

export function clampGridSide(value: number): number {
  return Math.min(MAX_GRID_SIDE, Math.max(MIN_GRID_SIDE, value || MIN_GRID_SIDE));
}

export function resolveGridConfig(
  words: string[],
  config: FillwordGridConfig,
): FillwordGridConfig {
  const minSide = minGridSideForWords(words, Boolean(config.allowTurns));
  return {
    ...config,
    rows: Math.max(clampGridSide(config.rows), minSide),
    cols: Math.max(clampGridSide(config.cols), minSide),
    fillBlanks: false,
  };
}

export function createFillwordPuzzle(
  words: string[],
  config: FillwordGridConfig = DEFAULT_GRID_CONFIG,
): GeneratedPuzzle {
  const normalized = words.map(normalizeWord).filter((w) => w.length >= 2);
  const safeConfig = resolveGridConfig(normalized, config);

  const { grid, placedWords } = safeConfig.allowTurns
    ? generateBentGrid(normalized, safeConfig)
    : generateGrid(normalized, safeConfig);

  return {
    grid: fillBlankLetters(grid, normalized),
    placedWords,
    words: placedWords.map((p) => p.word),
    config: safeConfig,
  };
}
