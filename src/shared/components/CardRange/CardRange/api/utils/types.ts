import type { FamilyPartStruct } from "../../../../../utils";
import type { FamiliesGroup } from "@shared/data/FamiliesGroups/types";

export type PartFamiliesStruct = [number, FamilyPartStruct[]];

// TODO: есть ли способ именно заменить тип имеющегося поля?
export type FamilyGroupPartsStruct = Omit<FamiliesGroup, "families"> & {
  familiesParts: PartFamiliesStruct[];
}