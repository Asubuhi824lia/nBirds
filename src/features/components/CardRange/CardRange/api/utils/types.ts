import type { FamilyPartStruct } from "@features/utils";
import type { FamiliesGroup } from "@pages/views/SpeciesNamesPage/data/types";

export type PartFamiliesStruct = [number, FamilyPartStruct[]];

// TODO: есть ли способ именно заменить тип имеющегося поля?
export type FamilyGroupPartsStruct = Omit<FamiliesGroup, "families"> & {
  familiesParts: PartFamiliesStruct[];
  // TODO: докорректировать в др местах импорта
  tabIndex?: number;
}