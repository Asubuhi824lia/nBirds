import { Card, CardContent, CardHeader, Grid, List, Typography } from "@mui/material";
import { ListItemGroup } from "./ListItemGroup";
import { findNameRoot } from "./utils";
import { type FamilyGroupPartsStruct, type RootGroupType } from "../../utils";

interface CardRangeProps {
  groupId: number;
  group: FamilyGroupPartsStruct;
  typeNameLatin: string;
  typeNameAlt: string;
  selectedNames: RootGroupType[];
}
export const CardRange = ({
  groupId,
  group,
  typeNameLatin,
  typeNameAlt,
  selectedNames
}: CardRangeProps) => {
  // TODO: check options type!

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
          {group.families.map(([species_num, families], partId, arr) => {
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