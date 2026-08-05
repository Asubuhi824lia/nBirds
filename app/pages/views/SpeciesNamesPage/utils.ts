import { FamiliesGroups } from "./data/FamiliesGroups";
import type { FamiliesGroup, FamilyGroupStruct } from "./data/types";

// with selected name-root-parts
// TODO: оставить flat? перевести на SelectedGroup?
export type RootGroupType = {
  groupId: number;
  root: string //TODO: конкретизировать типизацию ч/з "FamiliesGroups"
}

export interface FamilyStruct extends FamilyGroupStruct {
  SelectedGroups?: RootGroupType[];
}

type PartFamiliesStruct = [number, FamilyStruct[]];

// TODO: есть ли способ именно заменить тип имеющегося поля?
export type FamilyGroupPartsStruct = Omit<FamiliesGroup, "families"> & {
  familiesParts: PartFamiliesStruct[];
}
export function getPartsByNum(groups: FamiliesGroup[]): FamilyGroupPartsStruct[] {
  return groups.map(({ families, ...other }) => ({
    ...other,
    familiesParts: getGroupPartsByNum(families)
  }))
}
export function getGroupPartsByNum(families: FamilyGroupStruct[]) {
  const parts = new Map<number, FamilyStruct[]>();

  // get groups
  families.map((family) => {
    const tempFamily = structuredClone(family); // не мутировать оригинал

    // divide to subgroups by N
    const N = family.species_length; //результат поля в temp не меняется
    const key = N < 10 ? N : (Math.floor(N / 10) * 10);
    if (parts.has(key))
      parts.set(key, [...parts.get(key) as FamilyStruct[], tempFamily])
    else
      parts.set(key, [tempFamily])
  })

  // sort groups
  parts.forEach((part, key) => {
    const partSorted = part.sort((a, b) => a.species_length - b.species_length);
    parts.set(key, partSorted);
  })

  const partsSorted: PartFamiliesStruct[]
    = (Array.from(parts.entries())).sort((a, b) => a[0] - b[0]);

  return [...partsSorted];
}
// TODO: replace to a new file
// struct from API
export const GroupsPartsFamilies = getPartsByNum(FamiliesGroups);


// для GroupsPartsFamilies
// Оставить только группы с частями из семейств с SelectedGroups
export function filterSelectedFamiliesGroups(group: FamilyGroupPartsStruct[]) {
  return group.filter(group => (
    filterSelectedFamiliesParts(group.familiesParts).length
  ));
}
// Оставить только части из семейств с SelectedGroups
export function filterSelectedFamiliesParts(familiesParts: PartFamiliesStruct[]) {
  return familiesParts.filter(part => (
    filterSelectedFamilies(part[1]).length
  ));
}
// Оставить только семейства с SelectedGroups
export function filterSelectedFamilies(families: FamilyStruct[]) {
  return families.filter(family => (
    family.SelectedGroups?.length
  ));
}
