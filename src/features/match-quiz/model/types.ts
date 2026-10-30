export type MatchOption = {
  id: string;
  label: string;
  /** Correct association target */
  blockId: string;
  /** Future: thumbnail URL */
  imageUrl?: string;
  /** Future: sort key when options are images */
  imageSortKey?: string;
};

export type MatchBlockDef = {
  id: string;
  keyword: string;
  capacity: number;
};

export type MatchQuestion = {
  id: string;
  prompt: string;
  blocks: MatchBlockDef[];
  options: MatchOption[];
};

export type MatchLevel = {
  id: string;
  title: string;
  /** Short blurb for the topic picker */
  description: string;
  questions: MatchQuestion[];
};

export type PlacedByBlock = Record<string, string[]>;
