import type { FamilyPartStruct } from "@shared/lib/utils";
import type { FamiliesGroup } from "@shared/data/FamiliesGroups/types";

export type PartFamiliesStruct = [number, FamilyPartStruct[]];

export type FamilyGroupPartsStruct = Omit<FamiliesGroup, "families"> & {
  familiesParts: PartFamiliesStruct[];
}
// TODO: есть ли способ именно заменить тип имеющегося поля?