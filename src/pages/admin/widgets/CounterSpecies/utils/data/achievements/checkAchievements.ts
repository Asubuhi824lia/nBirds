import { achievements, achievementsSign, achievementsTitle, prefix as PREFIX } from "./data";
import {
  red, orange, amber,
  teal, green, lime,
  cyan, blue, indigo,
  grey, brown, purple
} from "@mui/material/colors";
import type { Color } from "@mui/material/styles";
import { getAchievementIndexes } from "./utils";
import type { OrderStruct } from "../types";

const signColors = {
  [PREFIX.MAX]: [red, orange, amber],
  [PREFIX.COMPLETED]: [teal, green, lime],
  [PREFIX.HALF]: [cyan, blue, indigo],
  [PREFIX.WITH]: [grey, brown, purple]
}


export function isAchieveInRange(startNum: number, endNum: number, order: OrderStruct) {
  const points = Object.values(getAchievementIndexes(order));
  return points.findIndex((value) => startNum < value && value < endNum) > -1;
}

export function checkAchievements(curCount: number, order: OrderStruct) {
  const {
    MAX_GROUPS,
    MAX_FAMILIES,
    MAX_SPECIES,
    COMPLETED_FIRST_TEN,
    COMPLETED_FIRST_FIFTY,
    COMPLETED_FIRST_HUNDRED,
    HALF_FAMILIES_INDEX,
    HALF_SPECIES_INDEX,
    HALF_SPECIES_LENGTH,
    WITH_FIRST_TEN,
    WITH_FIRST_FIFTY,
    WITH_FIRST_HUNDRED
  } = getAchievementIndexes(order);


  switch (curCount) {
    case COMPLETED_FIRST_TEN:
      return createAchievement(PREFIX.COMPLETED + "_FIRST_TEN", signColors[PREFIX.COMPLETED][0]);
    case COMPLETED_FIRST_FIFTY:
      return createAchievement(PREFIX.COMPLETED + "_FIRST_FIFTY", signColors[PREFIX.COMPLETED][1]);
    case COMPLETED_FIRST_HUNDRED:
      return createAchievement(PREFIX.COMPLETED + "_FIRST_HUNDRED", signColors[PREFIX.COMPLETED][2]);

    case WITH_FIRST_TEN:
      return createAchievement(PREFIX.WITH + "_FIRST_TEN", signColors[PREFIX.WITH][0], curCount.toString());
    case WITH_FIRST_FIFTY:
      return createAchievement(PREFIX.WITH + "_FIRST_FIFTY", signColors[PREFIX.WITH][1], curCount.toString());
    case WITH_FIRST_HUNDRED:
      return createAchievement(PREFIX.WITH + "_FIRST_HUNDRED", signColors[PREFIX.WITH][2], curCount.toString());

    case MAX_GROUPS:
      return createAchievement(PREFIX.MAX + "_GROUPS", signColors[PREFIX.MAX][0]);
    case MAX_FAMILIES:
      return createAchievement(PREFIX.MAX + "_FAMILIES", signColors[PREFIX.MAX][1]);
    case MAX_SPECIES:
      return createAchievement(PREFIX.MAX + "_SPECIES", signColors[PREFIX.MAX][2]);

    case HALF_FAMILIES_INDEX:
      return createAchievement(PREFIX.HALF + "_FAMILIES", signColors[PREFIX.HALF][0]);
    case HALF_SPECIES_INDEX:
      return createAchievement(PREFIX.HALF + "_SPECIES", signColors[PREFIX.HALF][1]);
    case HALF_SPECIES_LENGTH:
      return createAchievement(PREFIX.HALF + "_SPECIES_LENGTH", signColors[PREFIX.HALF][2]);
  }
}

type AchieveTypes = keyof typeof achievements;

export type AchieveCardType = {
  signSymbol: string | null;
  title: string;
  message: string;
  signBg: Color[500];
  accentBg: Color[100];
}

function createAchievement(CODE: AchieveTypes, color: Color, symbol?: string): AchieveCardType {
  return ({
    signSymbol: symbol ?? achievementsSign[CODE],
    title: achievementsTitle[CODE],
    message: achievements[CODE],
    signBg: color[500],
    accentBg: color[100],
  })
}