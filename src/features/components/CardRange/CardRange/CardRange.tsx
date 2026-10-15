import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { type FamilyGroupPartsStruct, type RootGroupType } from "../../../utils";
import { RangeGroupPart } from "./RangeGroupPart";

// 1. `group-${groupId}`
// 2. `group-${groupId}-part-${partId}`
// 3. `group-${groupId}-part-${partId}-family-${familyId}`

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
          {group.familiesParts.map(([species_num, part], partId, arr) =>
            <RangeGroupPart
              key={`group-${groupId}-part-${partId}`}
              groupId={groupId}
              partId={partId}
              isSingularPart={arr.length === 1}

              typeNameAlt={typeNameAlt}
              typeNameLatin={typeNameLatin}
              selectedNames={selectedNames}

              part={part}
              species_num={species_num}
            />
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}