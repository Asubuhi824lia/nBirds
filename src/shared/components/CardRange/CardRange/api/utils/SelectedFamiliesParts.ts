import type { FamilyPartStruct } from "../../../../../utils";
import type { FamilyGroupPartsStruct, PartFamiliesStruct } from "./types";


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
export function filterSelectedFamilies(families: FamilyPartStruct[]) {
  return families.filter(family => (
    family.SelectedGroups?.length
  ));
}