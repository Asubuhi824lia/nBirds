import type { OrderStruct } from "../types";

function getHalfSpeciesFamilyNum(order: OrderStruct) {
  const HALF_SPECIES_NUM = Math.floor(order.species_length / 2);
  let index = 0;
  for (let count = 0, i = 0; i < order.families.length; i++, index++) {
    count += order.families[i].species_length;
    if (count > HALF_SPECIES_NUM) break;
  }
  return order.families[index].species_length;
}

const getHalfFamilyIndex = (order: OrderStruct) =>
  Math.floor(order.families_length / 2) + 1;

function getSpeciesAllNum(order: OrderStruct) {
  // order is sorted
  const LEN = order.families.length;
  return order.families[LEN - 1].species_length;
}

const getHalfSpeciesLengthIndex = (len: number) => Math.ceil(len / 2);


function getCompletedFirstValues(order: OrderStruct) {
  const groups =
    new Set(
      order.families
        .reduce((acc, value) => [...acc, value.species_length], [] as number[])
    )

  return {
    MAX_GROUPS: groups.size,
    MAX_FAMILIES: order.families_length,
    MAX_SPECIES: getSpeciesAllNum(order),
    WITH_FIRST_TEN: Array.from(groups).filter((value) => value <= 10).length,
    WITH_FIRST_FIFTY: Array.from(groups).filter((value) => value <= 50).length,
    WITH_FIRST_HUNDRED: Array.from(groups).filter((value) => value <= 100).length,
    COMPLETED_FIRST_TEN: 10,
    COMPLETED_FIRST_FIFTY: 50,
    COMPLETED_FIRST_HUNDRED: 100
  }
}

export function getAchievementIndexes(order: OrderStruct) {
  return {
    ...getCompletedFirstValues(order),
    HALF_SPECIES_INDEX: getHalfSpeciesFamilyNum(order),
    HALF_FAMILIES_INDEX: getHalfFamilyIndex(order),
    HALF_SPECIES_LENGTH: getHalfSpeciesLengthIndex(getSpeciesAllNum(order))
  }
}
