import { List, ListItem, ListSubheader } from "@mui/material"
import type { FamilyGroupPartsStruct } from "./utils"

interface ListNamePartProps {
  GroupsPartsFamiliesSelected: FamilyGroupPartsStruct[]
}
// if ("реиспользуется") TODO: заменить названия: "конкретные состояния" => "общие параметры"
export const ListNamePart = ({
  GroupsPartsFamiliesSelected
}: ListNamePartProps) => {
  console.log(GroupsPartsFamiliesSelected)

  // const selectedGroups = Array.from(new Set(selectedNames.map(group => group.groupId)));
  // const selectedGroupsSorted = selectedNames.reduce((acc, { groupId, root }) => (
  //   acc.has(groupId) ? acc.set(groupId, [...acc.get(groupId), root]) : acc.set(groupId, [root])
  // ), new Map());

  return (
    <List>
      {GroupsPartsFamiliesSelected?.map(({ familiesParts }) => (
        1
        // {
        //   families.map((family) => (
        //     <ListItem>
        //       {family}
        //     </ListItem>
        //   ))
        // }
      ))}
    </List>
  )
}