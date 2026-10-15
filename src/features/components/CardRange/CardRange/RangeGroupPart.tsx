import { Grid, List, Typography } from "@mui/material";
import type { FamilyPartStruct, RootGroupType } from "@features/utils";
import { RangeGroupPartItem } from "./RangeGroupPartItem";

interface RangeGroupPartProps {
  // ВНУТРЯНКА
  species_num: number;
  part: FamilyPartStruct[];
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
  species_num,
  part,

  groupId,
  partId,
  isSingularPart,

  typeNameLatin,
  typeNameAlt,
  selectedNames,
}: RangeGroupPartProps) => {

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
              familyId={familyId}
              partId={partId}
              isSpecificValue={isSpecificValue}

              typeNameAlt={typeNameAlt}
              typeNameLatin={typeNameLatin}
              selectedNames={selectedNames}

              family={family}
            />
          )
        })}
      </List>
    </Grid>
  )
}