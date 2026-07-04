import { order } from "../order/order"; // TODO:
import { achievements } from "./data";
import { getCompletedFirstValues, getHalfFamilyIndex, getHalfSpeciesFamilyIndex, getHalfSpeciesLengthIndex } from "./utils";

// achivement points
const HALF_SPECIES_INDEX = getHalfSpeciesFamilyIndex(order);
const HALF_FAMILIES_INDEX = getHalfFamilyIndex(order);
const HALF_SPECIES_LENGTH_INDEX = getHalfSpeciesLengthIndex(order);

const {
  NUM_GROUPS,
  goneFirstTen,
  goneFirstFifty,
  goneFirstHundren
} = getCompletedFirstValues(order);


export function checkAchivements(curCount: number) {
  switch (curCount) {
    case goneFirstTen:
      showAchivement(achievements.COMPLETED_FIRST_TEN);
      break;
    case goneFirstFifty:
      showAchivement(achievements.COMPLETED_FIRST_FIFTY);
      break;
    case goneFirstHundren:
      showAchivement(achievements.COMPLETED_FIRST_HUNDRED);
      break;

    case NUM_GROUPS:
      showAchivement(achievements.MAX_GROUPS);
      break;

    case HALF_FAMILIES_INDEX:
      showAchivement(achievements.HALF_FAMILIES);
      break;
    case HALF_SPECIES_INDEX:
      showAchivement(achievements.HALF_SPECIES);
      break;
    case HALF_SPECIES_LENGTH_INDEX:
      showAchivement(achievements.HALF_SPECIES_LENGTH);
      break;
  }
}

// TODO: "string" to msg type!
function showAchivement(message: string) { }