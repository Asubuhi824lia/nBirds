import type { FamilyPartStruct } from "../../../../utils";
import type { FamilyGroupPartsStruct, PartFamiliesStruct } from "./types";


// для GroupsPartsFamilies
// Оставить только группы с частями из семейств с SelectedGroups
export function filterSelectedFamiliesGroups(group?: FamilyGroupPartsStruct[], isVisibleAlt?: boolean) {
  return group?.filter(group => (
    filterSelectedFamiliesParts(group.familiesParts, isVisibleAlt).length
  )) || [];
}

// Оставить только части из семейств с SelectedGroups
export function filterSelectedFamiliesParts(familiesParts: PartFamiliesStruct[], isVisibleAlt?: boolean) {
  return familiesParts.filter(part => (
    filterSelectedFamilies(part[1], isVisibleAlt).length
  ));
}

// Оставить только семейства с SelectedGroups
// +доп проверка для исключения включения альтернатив
export function filterSelectedFamilies(families: FamilyPartStruct[], isVisibleAlt = true) {
  if (!isVisibleAlt) {
    return families.filter(family => (
      family.SelectedGroups
        ?.filter(({ root }) => (family.name || family.alternative_names?.[0])?.toLowerCase().includes(root))
        ?.length
    ));
  }

  // По умолчанию учитывать все данные
  return families.filter(family => (
    family.SelectedGroups?.length
  ));
}