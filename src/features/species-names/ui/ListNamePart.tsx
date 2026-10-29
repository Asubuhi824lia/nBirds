import Highlighter from "react-highlight-words";
import { Badge, Divider, List, ListItem, ListSubheader, Stack, Typography } from "@mui/material"
import type { RootGroupType } from "@shared/lib/utils"
import { getOptionColor } from "./SelectNamePart/utils";
import type { FamilyGroupPartsStruct } from "../model/types";
import { getGroupsSelected_noApi } from "../model";
import { filterSelectedFamilies, filterSelectedFamiliesParts } from "../model/selectedFamiliesParts";
import ucFirst from "./CardRange/RangeGroupPartItem/ItemInfo/utils";

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
                      .map((part, pardInd) => (
                        filterSelectedFamilies(part[1], isVisibleAlt)
                          .map((family, familyInd) => {
                            const actualNames =
                              [family.name, ...family.alternative_names || '']
                                .filter(name => family.SelectedGroups?.filter(({ root }) => name.toLowerCase().includes(root))[0])

                            return (
                              <>
                                {(familyInd > 0 || pardInd > 0) && <Divider orientation="horizontal" variant="fullWidth" flexItem sx={{ borderColor: "plum" }} />}
                                <Stack direction="column" key={`part-${pardInd}`}>
                                  {actualNames.map((actualName, nameInd) => (
                                    <ListItem key={`part-${pardInd}-name-${nameInd}`} sx={actualNames.length > 1 ? { paddingY: .5 } : { paddingY: 1.2 }}>
                                      <Typography variant="body2">
                                        <Highlighter
                                          searchWords={family.SelectedGroups?.map(({ root }) => root) || []}
                                          textToHighlight={ucFirst(actualName)}
                                          highlightTag={({ children, searchIndex }) => (
                                            <mark style={{ backgroundColor: getOptionColor(family.SelectedGroups?.[searchIndex].groupId), padding: '0 2px' }}>
                                              {children}
                                            </mark>
                                          )}
                                        />
                                      </Typography>
                                    </ListItem>
                                  ))
                                  }
                                </Stack>
                              </>
                            )
                          })))}
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