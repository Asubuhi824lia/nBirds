import { Grid, List, Typography } from "@mui/material";
import type { RootGroupType } from "../../../utils";
import { RangeGroupPartItem } from "./RangeGroupPartItem";
import { getGroupPartById_noApi } from "./api";

interface RangeGroupPartProps {
  // определяются из последовательности
  groupId: number;
  partId: number;
  isSingularPart: boolean;
  // определяются пользователем
  typeNameLatin: string;
  typeNameAlt: string;
  selectedNames: RootGroupType[];
}

export const RangeGroupPart = ({
  groupId,
  partId,
  isSingularPart,

  typeNameLatin,
  typeNameAlt,
  selectedNames,
}: RangeGroupPartProps) => {

  const [species_num, part] = getGroupPartById_noApi({ groupId, partId });

  const isSingleOnly = new Set(
    part.map(({ species_length }) => species_length)
  ).size === 1;

  const isLonely =
    part.length === 1;

  const isSpecificValue = isLonely || isSingleOnly || species_num < 10;


  return (
    <Grid key={`group-${groupId}-part-${partId}`}>
      <Typography variant="h5" sx={isSingularPart ? { textAlign: "center" } : null}>
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
            return;
          }

          return (
            <RangeGroupPartItem
              key={`group-${groupId}-part-${partId}-family-${familyId}`}
              groupId={groupId}
              partId={partId}
              familyId={familyId}
              isSpecificValue={isSpecificValue}

              typeNameAlt={typeNameAlt}
              typeNameLatin={typeNameLatin}
              selectedNames={selectedNames}
            />
          )
        })}
      </List>
    </Grid>
  )
}