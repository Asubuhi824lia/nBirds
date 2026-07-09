import { order } from "../order/order"; // TODO:
import { achievements, achievementsSign, achievementsTitle } from "./data";
import { getCompletedFirstValues, getHalfFamilyIndex, getHalfSpeciesFamilyIndex, getHalfSpeciesLengthIndex } from "./utils";

import {
  red, orange, amber,
  teal, green, lime,
  cyan, blue, indigo,
  grey, brown, purple
} from "@mui/material/colors";
import type { Color } from "@mui/material/styles";

// оттенки характерного цвета — характерной группе ачивок
// TODO: общий префикс — в 1 источник
const signColors = {
  MAX: [red, orange, amber],
  COMPLETED: [teal, green, lime],
  HALF: [cyan, blue], HALF_LENGTH: indigo,
  WITH: [grey, brown, purple]
}

// achievement points
const HALF_SPECIES_INDEX = getHalfSpeciesFamilyIndex(order);
const HALF_FAMILIES_INDEX = getHalfFamilyIndex(order);
const HALF_SPECIES_LENGTH_INDEX = getHalfSpeciesLengthIndex(order);

const {
  NUM_GROUPS,
  MAX_FAMILIES,
  MAX_SPECIES,
  completedFirstTen,
  completedFirstFifty,
  completedFirstHundren,
  withFirstTen,
  withFirstFifty,
  withFirstHundren
} = getCompletedFirstValues(order);


export function checkAchievements(curCount: number) {
  switch (curCount) {
    case completedFirstTen:
      return createAchievement("COMPLETED_FIRST_TEN", signColors.COMPLETED[0]);
    case completedFirstFifty:
      return createAchievement("COMPLETED_FIRST_FIFTY", signColors.COMPLETED[1]);
    case completedFirstHundren:
      return createAchievement("COMPLETED_FIRST_HUNDRED", signColors.COMPLETED[2]);

    case withFirstTen:
      return createAchievement("WITH_FIRST_TEN", signColors.WITH[0], curCount.toString());
    case withFirstFifty:
      return createAchievement("WITH_FIRST_FIFTY", signColors.WITH[1], curCount.toString());
    case withFirstHundren:
      return createAchievement("WITH_FIRST_HUNDRED", signColors.WITH[2], curCount.toString());

    case NUM_GROUPS:
      return createAchievement("MAX_GROUPS", signColors.MAX[0]);
    case MAX_FAMILIES:
      return createAchievement("MAX_FAMILIES", signColors.MAX[1]);
    case MAX_SPECIES:
      return createAchievement("MAX_SPECIES", signColors.MAX[2]);

    case HALF_FAMILIES_INDEX:
      return createAchievement("HALF_FAMILIES", signColors.HALF[0]);
    case HALF_SPECIES_INDEX:
      return createAchievement("HALF_SPECIES", signColors.HALF[1]);
    case HALF_SPECIES_LENGTH_INDEX:
      return createAchievement("HALF_SPECIES_LENGTH", signColors.HALF_LENGTH);
  }
}

// TODO:
type AchieveTypes = keyof typeof achievements;

export type AchieveCardType = {
  signSymbol: string;
  title: string;
  message: string;
  signBg: Color[500];
  accentBg: Color[100];
}

export function createAchievement(CODE: AchieveTypes, color: Color, symbol?: string): AchieveCardType {

  return ({
    signSymbol: symbol ?? achievementsSign[CODE],
    title: achievementsTitle[CODE],
    message: achievements[CODE],
    signBg: color[500],
    accentBg: color[100],
  })
}