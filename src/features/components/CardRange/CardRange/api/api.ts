import { FamiliesGroups } from "@pages/views/SpeciesNamesPage/data/FamiliesGroups";
import { getPartsByNum } from "./utils/GroupParts";


export const getFamiliesById_noApi = ({
  groupId,
  familyId,
}: {
  groupId: number;
  familyId: number;
}) => {
  return FamiliesGroups[groupId].families[familyId];
}


export const getGroups_noApi = () => getPartsByNum(FamiliesGroups);

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