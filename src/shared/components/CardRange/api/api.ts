import { FamiliesGroups } from "@shared/data/FamiliesGroups";
import { getPartsByNum } from "./utils/GroupParts";
import type { FamilyGroupPartsStruct } from "./utils/types";
import type { RootGroupType } from "../../../utils";
import { filterSelectedFamilies, filterSelectedFamiliesParts } from "./utils/SelectedFamiliesParts";
import { calcNameSortingValue, getIsNameLatin } from "./utils/sort";


// dir sort: ASC | DESC
export const getGroups_noApi = ({
  dir,
  isSeparately = false,
  isLatin = false,
}: {
  dir?: boolean,
  isSeparately?: boolean,
  isLatin?: boolean,
}): FamilyGroupPartsStruct[] => {
  const groups = getPartsByNum(FamiliesGroups);
  if (dir === undefined) return groups;


  groups.forEach(group => {
    group.familiesParts.forEach(part => {
      /**
       * TODO: тройная же?
       * Двойная Сортировка
       * 1 — для локализацииx
       * 2 — для латыни
       */
      if (isSeparately) {
        // Все латинские названия — в конец
        part[1].sort((a, b) => (
          getIsNameLatin(b) ? 1 : -1 // TODO: to think WHY it doesnt work with "a" this way?
        ))
        // Не менять локализованное
        part[1].sort((a, b) => (
          getIsNameLatin(a) || getIsNameLatin(b)
            ? 1
            : calcNameSortingValue(a, b, isLatin, dir)
        ))
        // Не менять латынь
        part[1].sort((a, b) => (
          getIsNameLatin(a) || getIsNameLatin(b)
            ? -1
            : calcNameSortingValue(a, b, isLatin, dir)
        ))
      }
      else {
        part[1].sort((a, b) => (
          calcNameSortingValue(a, b, isLatin, dir)
        ))
      }
    })
  })

  return groups;
};

export const getGroupsSelected_noApi = (): FamilyGroupPartsStruct[] => {
  const GroupsPartsFamilies = getGroups_noApi({});
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

export const getGroupPartById_noApi = ({
  groupId,
  partId
}: {
  groupId: number;
  partId: number;
}) => {
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
}) => {
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