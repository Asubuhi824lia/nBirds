import { Card, CardContent, CardHeader, Grid, List, Typography } from "@mui/material";
import type { FamiliesGroup, FamilyGroupStruct } from "../../data/types";
import { ListItemGroup } from "./ListItemGroup";
import { findNameRoot } from "./utils";
import { getGroupsByNum } from "../../utils";

interface CardRangeProps {
  groupId: number;
  group: FamiliesGroup;
  typeNameLatin: string;
  typeNameAlt: string;
  selectedNames: string[];
}
export const CardRange = ({
  groupId,
  group,
  typeNameLatin,
  typeNameAlt,
  selectedNames
}: CardRangeProps) => {
  const partsSorted = getGroupsByNum(group, typeNameLatin) as [number, FamilyGroupStruct[]][];

  return (
    <Card key={`group-${groupId}`} sx={{ width: 'fit-content', height: "fit-content" }}>
      <CardHeader
        component="center"
        title={
          `${group.min_species_length}`
          + (group.max_species_length ? ` - ${group.max_species_length}` : '+')
        }
      />
      <CardContent>
        <Grid spacing={3} container sx={{ display: "flex", justifyContent: "center" }}>
          {partsSorted.map(([species_num, families], partId, arr) => {
            const isSingleOnly = new Set(
              families.map(({ species_length }) => species_length)
            ).size === 1;
            const isLonely =
              families.length === 1;

            const isSpecificValue = isLonely || isSingleOnly || species_num < 10;

            const isAltWithout = typeNameAlt === "alt_names_without";

            return (
              <Grid key={`group-${groupId}-part-${partId}`}>
                <Typography variant="h5" sx={(arr.length === 1) ? { textAlign: "center" } : null}>
                  {(isSpecificValue ? families[0].species_length : `${species_num}+`)}
                </Typography>
                <List dense>
                  {families.map((family, familyId) => {
                    const name =
                      family.name
                      || (isAltWithout ? false : family.alternative_names?.[0])
                      || family.latin_name
                      || "???";

                    //поиск совпадений
                    const nameParts = selectedNames
                      .map(nameSelected => findNameRoot({ name, nameSelected }))
                      .reduce((acc, names) => names ? [...(acc ?? []), ...names] : acc, []);

                    return (
                      <ListItemGroup
                        key={`group-${groupId}-part-${partId}-family-${familyId}`}
                        familyId={familyId}
                        family={family}
                        name={name}
                        specPrimary={{
                          isSpecificValue,
                          selectedNames,
                          nameParts
                        }}
                        specSecondary={{
                          typeNameAlt,
                          typeNameLatin
                        }}
                      />
                    )
                  })}
                </List>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}