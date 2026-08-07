import { List, ListItem, ListSubheader, Typography } from "@mui/material"
import type { FamilyGroupPartsStruct } from "./utils"

interface ListNamePartProps {
  tabActual: number;
  GroupsPartsFamiliesSelected: FamilyGroupPartsStruct[],
}
// if ("реиспользуется") TODO: заменить названия: "конкретные состояния" => "общие параметры"
export const ListNamePart = ({
  tabActual,
  GroupsPartsFamiliesSelected
}: ListNamePartProps) => {
  // const selectedGroups = Array.from(new Set(selectedNames.map(group => group.groupId)));
  // const selectedGroupsSorted = selectedNames.reduce((acc, { groupId, root }) => (
  //   acc.has(groupId) ? acc.set(groupId, [...acc.get(groupId), root]) : acc.set(groupId, [root])
  // ), new Map());

  return (
    <section>
      <List>
        {GroupsPartsFamiliesSelected?.map(({ familiesParts, ...others }, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 0 }}>
              <ListSubheader sx={{ bgcolor: index === tabActual ? "Background" : "ThreeDFace" }}>
                <Typography variant="subtitle2" component="center">{getTabLabel(others)}</Typography>
              </ListSubheader>
              <List>
                {familiesParts.map((part, i) => (
                  part[1].map(family => (
                    <ListItem key={`part-${i}`}>
                      <Typography variant="body2">{family.name}</Typography>
                    </ListItem>
                  ))
                ))}
              </List>
            </ListItem>
          </ListItem>
        ))}
      </List>
    </section>
  )
}

type GroupRangeType = Pick<FamilyGroupPartsStruct, "max_species_length" | "min_species_length">;
function getTabLabel(groupRange: GroupRangeType) {
  const {
    max_species_length: max,
    min_species_length: min
  } = groupRange;

  return (
    `${min}`
    + (max ? ` - ${max}` : '+')
  )
}

{/* Перечень №1 */ }
{/* Вид: "ТАБ — число совпадений (общее)" */ }
{/* Вид: "ТАБ — число ГРУПП (общее) — число совпадений (общее)" */ }
{/* Вид: "ТАБ — (ГРУППа — число совпадений (общее)) * ГРУППы" */ }
{/* Вид: "ТАБ — число ТИПОВ совпадений (общее)" */ }

{/* Вид: "ТИП — Перечень №1" */ }