import type { GridConfig, PlacedWord } from "word-search-puzzle-generator";

/** Extends the library config with snake/bent paths (custom mode). */
export type FillwordGridConfig = GridConfig & {
  /**
   * Allow changing direction within a word (adjacent cells).
   * Not supported by `generateGrid` / `WordSearchGrid` — handled by our code.
   */
  allowTurns?: boolean;
};

export type FillwordTopic = {
  id: string;
  title: string;
  description?: string;
  words: string[];
  config: FillwordGridConfig;
  /** Optional fixed grid; if omitted, generated on play. */
  grid?: string[][];
  placedWords?: PlacedWord[];
};

export type FillwordTopicJson = {
  id: string;
  title: string;
  description?: string;
  words: string[];
  config: FillwordGridConfig;
};

export type GeneratedPuzzle = {
  grid: string[][];
  placedWords: PlacedWord[];
  words: string[];
  config: FillwordGridConfig;
};
