import { getExistName, type FamilyPartStruct } from "../../../../../utils";

export function getIsNameLatin(elem: FamilyPartStruct): boolean {
  return !!getExistName(elem).match(/[a-zA-Z]/g);
}
export function calcNameSortingValue(a: FamilyPartStruct, b: FamilyPartStruct, isLatin: boolean, dir: boolean): number {
  return (
    a.species_length === b.species_length
      ? (
        dir
          ? getExistName(b, isLatin).charCodeAt(0) - getExistName(a, isLatin).charCodeAt(0)
          : getExistName(a, isLatin).charCodeAt(0) - getExistName(b, isLatin).charCodeAt(0)
        // TODO: сортировка по последующим символам, если первы(е) одинаковы
      )
      : -1
  )
}