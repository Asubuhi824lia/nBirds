import { Direction } from "../ui/SelectNamePart/components/SortNaming";
import { getExistName, type FamilyPartStruct } from "@shared/lib/utils";

// Проверка существования названий, помимо латыни
export function getIsLatinName(elem: FamilyPartStruct): boolean {
  return !!getExistName(elem).match(/[a-zA-Z]/g);
}
/**
 * Вычисляет результат сравнения двух объектов по имени.
 * @param a Первый объект
 * @param b Второй объект
 * @param isLatin Флаг сортировки ТОЛЬКО по полю с названием на латыни
 * @param isDescending Флаг сортировки по убыванию (dir = true)
 */
export function calcNameSortingValue(a: FamilyPartStruct, b: FamilyPartStruct, isLatin: boolean, dir: boolean): number {
  const nameA = getExistName(a, isLatin);
  const nameB = getExistName(b, isLatin);

  // localeCompare обеспечивает корректную алфавитную сортировку (включая русскую локаль и регистр)
  const compareResult = nameA.localeCompare(nameB, isLatin ? 'en' : 'ru', { sensitivity: 'base' });

  return dir ? -compareResult : compareResult;
}

/**
 * Фиксирует порядок по species_length (направление — isSortSpecies).
 * При равном species_length возвращает 0: дальше решает алфавит (dir) / латынь в sortPartFamilies.
 */
export function calcSpeciesSorting(
  a: FamilyPartStruct,
  b: FamilyPartStruct,
  isSortSpecies: Direction,
): number {
  if (a.species_length === b.species_length) return 0;

  const aBeforeB = a.species_length < b.species_length;
  if (isSortSpecies === Direction.ASC) {
    return aBeforeB ? -1 : 1;
  }
  return aBeforeB ? 1 : -1;
}