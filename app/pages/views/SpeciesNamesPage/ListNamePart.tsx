import { List, ListItem, ListItemText, ListSubheader } from "@mui/material"
import type { FamilyGroupPartsStruct } from "./utils"

interface ListNamePartProps {
  GroupsPartsFamiliesSelected: FamilyGroupPartsStruct[]
}
// if ("реиспользуется") TODO: заменить названия: "конкретные состояния" => "общие параметры"
export const ListNamePart = ({
  GroupsPartsFamiliesSelected
}: ListNamePartProps) => {
  // const selectedGroups = Array.from(new Set(selectedNames.map(group => group.groupId)));
  // const selectedGroupsSorted = selectedNames.reduce((acc, { groupId, root }) => (
  //   acc.has(groupId) ? acc.set(groupId, [...acc.get(groupId), root]) : acc.set(groupId, [root])
  // ), new Map());

  return (
    <section>
      <List>
        {GroupsPartsFamiliesSelected?.map(({ familiesParts }, index) => (
          <ListItem key={index}>
            <ListSubheader>{index}</ListSubheader>
            <ListItemText>
              Совпадений: {familiesParts.reduce((acc, part) => acc + part[1].length, 0)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </section>
  )
}


{/* Перечень №1 */ }
{/* Вид: "ТАБ — число совпадений (общее)" */ }
{/* Вид: "ТАБ — число ГРУПП (общее) — число совпадений (общее)" */ }
{/* Вид: "ТАБ — (ГРУППа — число совпадений (общее)) * ГРУППы" */ }
{/* Вид: "ТАБ — число ТИПОВ совпадений (общее)" */ }

{/* Вид: "ТИП — Перечень №1" */ }