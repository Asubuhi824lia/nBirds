import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { type RootGroupType } from "@shared/lib/utils";
import { RangeGroupPart } from "./RangeGroupPart";
import { getGroupById_noApi } from "../../model";
import type { Direction } from "../SelectNamePart/components/SortNaming";

// 1. `group-${groupId}`
// 2. `group-${groupId}-part-${partId}`
// 3. `group-${groupId}-part-${partId}-family-${familyId}`

interface CardRangeProps {
  groupId: number;
  typeNameLatin: string;
  typeNameAlt: string;
  selectedNames: RootGroupType[];
  // sort flags
  dir: Direction;
  isSortSpecies: Direction | null;
  isLatin: boolean;
  isLatinSeparately: boolean;
}
export const CardRange = ({
  groupId,
  typeNameLatin,
  typeNameAlt,
  selectedNames,

  dir,
  isSortSpecies,
  isLatin,
  isLatinSeparately
}: CardRangeProps) => {
  // TODO: check options type!
  const group = getGroupById_noApi({ groupId });

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
          {group.familiesParts.map((_, partId, arr) =>
            <RangeGroupPart
              key={`group-${groupId}-part-${partId}`}
              groupId={groupId}
              partId={partId}
              isSingularPart={arr.length === 1}

              typeNameAlt={typeNameAlt}
              typeNameLatin={typeNameLatin}
              selectedNames={selectedNames}

              dir={dir}
              isSortSpecies={isSortSpecies}
              isLatin={isLatin}
              isLatinSeparately={isLatinSeparately}
            />
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}