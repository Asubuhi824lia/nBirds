import { Card, CardContent, CardHeader, Grid, List, Typography } from "@mui/material";
import { ListItemGroup } from "./ListItemGroup";
import { findNameRoot } from "./utils";
import { type FamilyGroupPartsStruct, type RootGroupType } from "../../utils";
import { dash } from "../SelectNamePart/data";


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
        <Grid spacing={3} container>
          {group.familiesParts.map(([species_num, part], partId, arr) => {
            const isSingleOnly = new Set(
              part.map(({ species_length }) => species_length)
            ).size === 1;
            const isLonely =
              part.length === 1;

            const isSpecificValue = isLonely || isSingleOnly || species_num < 10;

            return (
              <Grid key={`group-${groupId}-part-${partId}`}>
                <Typography variant="h5" sx={(arr.length === 1) ? { textAlign: "center" } : null}>
                  {(isSpecificValue ? part[0].species_length : `${species_num}+`)}
                </Typography>
                <List dense>
                  {part.map((family, familyId) => {
                    if (
                      typeNameLatin === "latin_names_without" &&
                      typeNameAlt === "alt_names_without" &&
                      !family.name
                    ) {
                      return;
                    }

                    if (
                      typeNameLatin === "latin_names_without" &&
                      !family.name &&
                      !family?.alternative_names?.length
                    ) {
                      return
                    }

                    const name =
                      typeNameLatin === "latin_names_only"
                        ? family.latin_name || "???" // только латинское
                        : (
                          family.name // nameMain
                          || (
                            typeNameAlt === "alt_names_without"
                              ? family.latin_name // либо главное, либо латинское
                              : (
                                (typeNameAlt === "alt_names_with_only") && family?.alternative_names?.length
                                  ? family.alternative_names[0]
                                  : (
                                    typeNameLatin === "latin_names_with_only"
                                      ? family.latin_name
                                      : dash
                                  )
                              )
                          )
                        )

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