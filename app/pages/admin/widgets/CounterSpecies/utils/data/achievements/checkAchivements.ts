import { order } from "../order/order"; // TODO:
import { achievements, achievementsSign, achievementsTitle } from "./data";
import { getCompletedFirstValues, getHalfFamilyIndex, getHalfSpeciesFamilyIndex, getHalfSpeciesLengthIndex } from "./utils";

import { red, orange, amber, green, cyan, blue, purple, brown } from "@mui/material/colors";
const signColors = [red, orange, amber, green, cyan, blue, purple, brown];

// achivement points
const HALF_SPECIES_INDEX = getHalfSpeciesFamilyIndex(order);
const HALF_FAMILIES_INDEX = getHalfFamilyIndex(order);
const HALF_SPECIES_LENGTH_INDEX = getHalfSpeciesLengthIndex(order);

const {
  NUM_GROUPS,
  MAX_FAMILIES,
  goneFirstTen,
  goneFirstFifty,
  goneFirstHundren
} = getCompletedFirstValues(order);


export function checkAchivements(curCount: number) {
  switch (curCount) {
    case goneFirstTen:
      return createAchivement("COMPLETED_FIRST_TEN");
    case goneFirstFifty:
      return createAchivement("COMPLETED_FIRST_FIFTY");
    case goneFirstHundren:
      return createAchivement("COMPLETED_FIRST_HUNDRED");

    case NUM_GROUPS:
      return createAchivement("MAX_GROUPS");
    case MAX_FAMILIES:
      return createAchivement("MAX_FAMILIES");

    case HALF_FAMILIES_INDEX:
      return createAchivement("HALF_FAMILIES");
    case HALF_SPECIES_INDEX:
      return createAchivement("HALF_SPECIES");
    case HALF_SPECIES_LENGTH_INDEX:
      return createAchivement("HALF_SPECIES_LENGTH");
  }
}

// TODO:
type AchieveTypes = keyof typeof achievements;

export type AchieveCardType = {
  signSymbol: string;
  title: string;
  message: string;
  signBg: (id: number) => string;
}

export function createAchivement(CODE: AchieveTypes): AchieveCardType {
  return ({
    signSymbol: achievementsSign[CODE],
    title: achievementsTitle[CODE],
    message: achievements[CODE],
    signBg: (id: number) => signColors[id % signColors.length][500],
  })
}