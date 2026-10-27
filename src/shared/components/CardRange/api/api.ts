import { FamiliesGroups } from "@shared/data/FamiliesGroups";
import { getPartsByNum } from "./utils/GroupParts";
import type { FamilyGroupPartsStruct, PartFamiliesStruct } from "./utils/types";
import type { FamilyPartStruct, RootGroupType } from "../../../utils";
import { filterSelectedFamilies, filterSelectedFamiliesParts } from "./utils/SelectedFamiliesParts";


export const getGroups_noApi = (): FamilyGroupPartsStruct[] => getPartsByNum(FamiliesGroups);

export const getGroupsSelected_noApi = (): FamilyGroupPartsStruct[] => {
  const GroupsPartsFamilies = getGroups_noApi() as FamilyGroupPartsStruct[];
  return GroupsPartsFamilies.map(({ familiesParts, ...otherTabInfo }) => ({
    ...otherTabInfo,
    familiesParts:
      // оставить информатичные "parts"
      filterSelectedFamiliesParts(familiesParts)
        .map(([partId, part]) => ([
          partId,
          // оставить информативные "families"
          filterSelectedFamilies(part)
        ]))
  }))
}

export const getGroupById_noApi = ({
  groupId
}: {
  groupId: number;
}): FamilyGroupPartsStruct => {
  const GroupsPartsFamilies = getPartsByNum(FamiliesGroups);
  return GroupsPartsFamilies[groupId];
}

export const getGroupPartById_noApi = ({
  groupId,
  partId
}: {
  groupId: number;
  partId: number;
}): PartFamiliesStruct => {
  const group = getGroupById_noApi({ groupId });
  return group.familiesParts[partId]
}

export const getFamiliesById_noApi = ({
  groupId,
  partId,
  familyId,
}: {
  groupId: number;
  partId: number;
  familyId: number;
}): FamilyPartStruct => {
  const [, part] = getGroupPartById_noApi({ groupId, partId });
  return part[familyId];
}

// TODO: SelectedParts
// addSelectedPart_noApi    | by Id
// deleteSelectedPart_noApi | by Id

// add
// delete
export const updateGroupSelectedParts_noApi = ({
  selectedRoots
}: {
  selectedRoots: RootGroupType[]
}) => {
  // const GroupsPartsFamilies = getGroups_noApi();

  FamiliesGroups.forEach((group) => {
    group.families.forEach((family) => {
      const name = (family.name || family.alternative_names?.[0])?.toLowerCase();
      if (!name)
        return;

      const curSelectedGroups = selectedRoots.filter((root) => name.includes(root.root.toLowerCase()));

      // TODO: вроде работает, но переделать на покорректнее
      // GroupsPartsFamilies[groupId].families[partId][1][familyId].SelectedGroups = [...curSelectedGroups];
      family.SelectedGroups = [...curSelectedGroups];
    })
  })
}

/**
 * Массив групп – id по group
 * Массив групп – id/name по family по parts по group
 * Массив групп – selected parts по group
 * Массив групп – selected family по parts по group
 */