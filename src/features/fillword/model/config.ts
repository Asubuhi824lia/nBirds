import type { FillwordGridConfig } from "./types";

/** Default generator settings (kept free of runtime lib imports for SSR). */
export const DEFAULT_GRID_CONFIG: FillwordGridConfig = {
  rows: 12,
  cols: 12,
  allowReverse: true,
  allowDiagonal: true,
  allowOverlap: false,
  fillBlanks: false,
  allowTurns: false,
};
