import type { MatchLevel } from "../model/types";
import { passeriformesLevel } from "./passeriformes";
import { raptorsLevel } from "./raptors";

export const matchLevels: MatchLevel[] = [passeriformesLevel, raptorsLevel];

export function getMatchLevel(id: string): MatchLevel | undefined {
  return matchLevels.find((level) => level.id === id);
}
