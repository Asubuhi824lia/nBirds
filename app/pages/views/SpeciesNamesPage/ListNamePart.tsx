import { List, ListItem, ListSubheader, Typography } from "@mui/material"
import type { FamilyGroupPartsStruct } from "./utils"
import { TextPartsSelected } from "./components/CardRange/ItemInfo/ItemInfoMain";
import { findNameRoot } from "./components/CardRange/utils";

interface ListNamePartProps {
  tabActual: number;
  handleTabClicked: (tab: number) => void;
  GroupsPartsFamiliesSelected: FamilyGroupPartsStruct[],
}
// if ("реиспользуется") TODO: заменить названия: "конкретные состояния" => "общие параметры"
export const ListNamePart = ({
  tabActual,
  GroupsPartsFamiliesSelected,
  handleTabClicked
}: ListNamePartProps) => {
  // const selectedGroups = Array.from(new Set(selectedNames.map(group => group.groupId)));
  // const selectedGroupsSorted = selectedNames.reduce((acc, { groupId, root }) => (
  //   acc.has(groupId) ? acc.set(groupId, [...acc.get(groupId), root]) : acc.set(groupId, [root])
  // ), new Map());
  return (
    <section>
      <List>
        {GroupsPartsFamiliesSelected?.map(({ familiesParts, ...others }, index) =>
          !!familiesParts.length && (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 0 }}>
                <ListSubheader
                  onClick={() => handleTabClicked(index)}
                  sx={{ bgcolor: index === tabActual ? "Background" : "ThreeDFace", textAlign: "center", lineHeight: "normal", cursor: "pointer" }}
                >
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    <Typography variant="subtitle2">{getTabLabel(others)}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">({familiesParts.length})</Typography>
                  </span>
                </ListSubheader>
                <List>
                  {familiesParts.map((part, i) => (
                    part[1].map(family => {
                      if (!family.SelectedGroups)
                        return; // для нивелирования дальнейших предупреждений TS

                      const name = family.name.toLowerCase();

                      const SelectedGroupsSorted = family.SelectedGroups
                        ?.sort((a, b) => family.name.indexOf(a.root) - family.name.indexOf(b.root));

                      //поиск совпадений: уточнённый
                      const namePartsFull =
                        SelectedGroupsSorted
                          .map((nameSelected, id, groups) => {
                            const indexStart =
                              id === 0
                                ? 0
                                : name.indexOf(groups[id - 1].root) + groups[id - 1].root.length;
                            const indesEnd =
                              id === groups.length - 1
                                ? undefined
                                : name.indexOf(nameSelected.root) + nameSelected.root.length;

                            const curSubstring = name.slice(indexStart, indesEnd).trim()

                            return findNameRoot({ name: curSubstring, nameSelected })
                          })
                          .reduce((acc, names) => names ? [...(acc ?? []), ...names] : acc, []);

                      return (
                        <ListItem key={`part-${i}`}>
                          <Typography variant="body2">
                            <TextPartsSelected
                              name={family.name}
                              nameParts={namePartsFull}
                              getPartGroup={(value: string) => (
                                family.SelectedGroups
                                  ?.find(({ root }) => value.toLowerCase().includes(root.toLowerCase()))
                              )}
                            />
                          </Typography>
                        </ListItem>
                      )
                    })
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