import { FamiliesGroups } from "@pages/views/SpeciesNamesPage/data/FamiliesGroups";
import { getPartsByNum } from "./utils/GroupParts";
import type { FamilyGroupPartsStruct } from "./utils/types";
import type { RootGroupType } from "@features/utils";


export const getFamiliesById_noApi = ({
  groupId,
  familyId,
}: {
  groupId: number;
  familyId: number;
}) => {
  return FamiliesGroups[groupId].families[familyId];
}


export const getGroups_noApi = () => getPartsByNum(FamiliesGroups) as FamilyGroupPartsStruct[];

export const getGroupById_noApi = ({
  groupId
}: {
  groupId: number;
}) => {
  const GroupsPartsFamilies = getPartsByNum(FamiliesGroups);
  // поиск и мутирвоание (дополнение) данных
  GroupsPartsFamilies.forEach((group) => {
    group.familiesParts.forEach((part) => {
      part[1].forEach((family) => {
        const name = (family.name || family.alternative_names?.[0])?.toLowerCase();
        if (!name)
          return;
      })
    })
  })

  return GroupsPartsFamilies[groupId];
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