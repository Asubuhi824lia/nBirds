
// with selected name-root-parts

import type { FamilyGroupStruct } from "@shared/data/FamiliesGroups/types";

// TODO: оставить flat? перевести на SelectedGroup?
export type RootGroupType = {
  groupId: number;
  root: string
}
//TODO: конкретизировать типизацию ч/з "FamiliesGroups"
export interface FamilyPartStruct extends FamilyGroupStruct {
  SelectedGroups?: RootGroupType[];
}



export function getExistName(family: FamilyPartStruct, isLatin: boolean = false): string {
  return (
    isLatin
      ? family.latin_name
      : family.name || family?.alternative_names?.[0] || family.latin_name
  )
}
