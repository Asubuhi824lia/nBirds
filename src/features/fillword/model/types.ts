import type { GridConfig, PlacedWord } from "word-search-puzzle-generator";

export type FillwordTopic = {
  id: string;
  title: string;
  description?: string;
  words: string[];
  config: GridConfig;
  /** Optional fixed grid; if omitted, generated on play. */
  grid?: string[][];
  placedWords?: PlacedWord[];
};

export type FillwordTopicJson = {
  id: string;
  title: string;
  description?: string;
  words: string[];
  config: GridConfig;
};

export type GeneratedPuzzle = {
  grid: string[][];
  placedWords: PlacedWord[];
  words: string[];
  config: GridConfig;
};
