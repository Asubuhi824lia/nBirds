import Highlighter from "react-highlight-words";
import { Badge, List, ListItem, ListSubheader, Typography } from "@mui/material"
import type { RootGroupType } from "../../utils"
import { getOptionColor } from "../SelectNamePart/utils";
import type { FamilyGroupPartsStruct } from "../CardRange/api/utils/types";
import { getGroupsSelected_noApi } from "../CardRange/api";
import { filterSelectedFamilies, filterSelectedFamiliesParts } from "../CardRange/api/utils/SelectedFamiliesParts";

interface ListNamePartProps {
  isVisibleAlt: boolean;
  tabActual: number;
  handleTabClicked: (tab: number) => void;
}
// if ("реиспользуется") TODO: заменить названия: "конкретные состояния" => "общие параметры"
export const ListNamePart = ({
  isVisibleAlt,
  tabActual,
  handleTabClicked
}: ListNamePartProps) => {

  const GroupsPartsFamiliesSelected = getGroupsSelected_noApi();

  // Фильтрация от альтернатив, если не показываем (isVisibleAlt === false)
  const GroupsPartsFamiliesSelectedActual: (FamilyGroupPartsStruct & { tabIndex?: number })[] = [
    GroupsPartsFamiliesSelected[tabActual],
    ...GroupsPartsFamiliesSelected
      .map((prev, i) => ({ ...prev, tabIndex: i }))
      .filter((_, curIndex) => tabActual !== curIndex)
  ];

  console.log("group", GroupsPartsFamiliesSelectedActual)

  return (
    <section>
      <List>
        {GroupsPartsFamiliesSelectedActual?.map(({ familiesParts, tabIndex = tabActual, ...others }, index) => {
          const PartsCountTypesSelected = familiesParts.reduce((acc, part): RootGroupType[] => ([
            ...acc,
            ...filterSelectedFamilies(part[1], isVisibleAlt).reduce((acc, family): RootGroupType[] => {
              return family.SelectedGroups ? [...acc, ...family.SelectedGroups] : acc;
            }, [])
          ]), [])

          const TypesSelected = new Map();

          PartsCountTypesSelected.forEach(({ groupId }) =>
            TypesSelected.set(
              groupId,
              1 + (TypesSelected.get(groupId) ?? 0)
            )
          )

          // (isVisibleAlt || !!family.SelectedGroups.filter(({ root }) => (family.name || family.alternative_names?.[0])?.toLowerCase().includes(root)).length)
          return !!filterSelectedFamiliesParts(familiesParts, isVisibleAlt).length &&
            (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 0 }}>
                  <ListSubheader
                    onClick={() => tabIndex === tabActual || handleTabClicked(tabIndex as number)}
                    sx={{
                      bgcolor: index === 0 ? "Background" : "ThreeDFace",
                      cursor: index === 0 ? "auto" : "pointer",
                      textAlign: "center",
                      lineHeight: "normal",
                    }}
                  >
                    <span style={{ display: "inline-flex", gap: 4, paddingInline: 0 }}>
                      <Typography variant="subtitle2" sx={{ visibility: "hidden" }}>({familiesParts.length})</Typography>  {/* для центрирования */}
                      <Typography variant="subtitle1">{getTabLabel(others)}</Typography>
                      <Typography variant="subtitle2" color="textDisabled">({familiesParts.length})</Typography>
                    </span>
                    <p style={{ display: "flex", justifyContent: "center", gap: 4 }}>
                      {Array.from(TypesSelected).map(([typeId, typeCount]) => (
                        <Badge key={typeId} variant="dot" sx={{ color: getOptionColor(typeId) }}>{typeCount}</Badge>
                      ))}
                    </p>
                  </ListSubheader>
                  <List>
                    {filterSelectedFamiliesParts(familiesParts, isVisibleAlt)
                      .map((part, i) => (
                        filterSelectedFamilies(part[1], isVisibleAlt)
                          .map(family => !!family.SelectedGroups
                            && (
                              <ListItem key={`part-${i}`}>
                                <Typography variant="body2">
                                  <Highlighter
                                    searchWords={family.SelectedGroups.map(({ root }) => root)}
                                    textToHighlight={family.name}
                                    highlightTag={({ children, searchIndex }) => (
                                      <mark style={{ backgroundColor: getOptionColor(family.SelectedGroups?.[searchIndex].groupId), padding: '0 2px' }}>
                                        {children}
                                      </mark>
                                    )}
                                  />
                                </Typography>
                              </ListItem>
                            )
                          )))}
                  </List>
                </ListItem>
              </ListItem>
            )
        })}
      </List>
    </section >
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