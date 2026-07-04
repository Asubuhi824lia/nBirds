import type { OrderStruct } from "../types";

export function getHalfSpeciesFamilyIndex(order: OrderStruct) {
  const HALF_SPECIES_NUM = Math.floor(order.species_length / 2);
  let index = 0;
  for (let count = 0, i = 0; i < order.families.length; i++, index++) {
    count += order.families[i].species_length;
    if (count > HALF_SPECIES_NUM) break;
  }
  return index;
}

export const getHalfFamilyIndex = (order: OrderStruct) =>
  Math.floor(order.families_length / 2) + 1;

export function getHalfSpeciesLengthIndex(order: OrderStruct) {
  // order is sorted
  const LEN = order.families.length;
  const MAX_SPECIES_NUM = order.families[LEN - 1].species_length;
  let index = LEN - 1;
  for (let i = LEN - 1; i >= 0; i--, index--) {
    if (order.families[i].species_length <= MAX_SPECIES_NUM / 2)
      break;
  }
  return index;
}


export function getCompletedFirstValues(order: OrderStruct) {
  const groups =
    new Set(
      order.families
        .reduce((acc, value) => [...acc, value.species_length], [] as number[])
    )

  return {
    NUM_GROUPS: groups.size,
    goneFirstTen: Array.from(groups).filter((value) => value < 10).length,
    goneFirstFifty: Array.from(groups).filter((value) => value < 50).length,
    goneFirstHundren: Array.from(groups).filter((value) => value < 100).length,
  }
}