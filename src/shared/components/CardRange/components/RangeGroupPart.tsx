import { Grid, List, Typography } from "@mui/material";
import type { FamilyPartStruct, RootGroupType } from "../../../utils";
import { RangeGroupPartItem } from "./RangeGroupPartItem/RangeGroupPartItem";
import { getGroupPartById_noApi } from "../api";
import { Direction } from "@shared/components/SelectNamePart/components/SortNaming";
import { calcNameSortingValue, getIsLatinName } from "../api/utils/sort";

interface RangeGroupPartProps {
  // определяются из последовательности
  groupId: number;
  partId: number;
  isSingularPart: boolean;
  // определяются пользователем
  typeNameLatin: string;
  typeNameAlt: string;
  selectedNames: RootGroupType[];
  // sort flags
  dir: Direction;
  isLatin: boolean;
  isLatinSeparately: boolean;
}

export const RangeGroupPart = ({
  groupId,
  partId,
  isSingularPart,

  typeNameLatin,
  typeNameAlt,
  selectedNames,

  dir,
  isLatin,
  isLatinSeparately
}: RangeGroupPartProps) => {
  const [species_num, part] = getGroupPartById_noApi({ groupId, partId });
  console.log(species_num, part)
  // Упрощённый массив с информацией про названия
  const partNamesOrdered: FamilyPartStruct[] =
    part.map(({ name, latin_name, alternative_names, species_length }) => ({
      name,
      latin_name,
      alternative_names: alternative_names ? [...alternative_names] : [],
      species_length
    }))
  sortPartFamilies({
    part: partNamesOrdered,
    dir,
    isLatin,
    isLatinSeparately
  });

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
        {partNamesOrdered.map((family) => {
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

          const familyId = part.findIndex(({ latin_name, name }) =>
            family.latin_name
              ? latin_name === family.latin_name
              // TODO: временное
              : name === family.name
          );

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

// TODO: replace
function sortPartFamilies({
  part,
  dir,
  isLatin = false,
  isLatinSeparately,
}: {
  part: FamilyPartStruct[];
  dir: Direction;
  isLatin?: boolean;
  isLatinSeparately: boolean;
}) {
  /**
   * Двойная Сортировка
   * 1 — для локализации
   * 2 — для латыни
   */
  // Все латинские названия — в конец

  // TODO: переименовать isLatinSeparately –> isLatinSeparately
  if (isLatinSeparately) {
    part.sort((a, b) => {
      const isALatin = getIsLatinName(a);
      const isBLatin = getIsLatinName(b);

      // ШАГ 1: Группировка. Русские названия (isLatin === false) всегда должны быть перед латинскими (isLatin === true)
      if (isALatin !== isBLatin) {
        // Если a - это латынь, она должна идти после b (возвращаем 1).
        // Если b - это латынь, a должна идти перед b (возвращаем -1).
        return isALatin ? 1 : -1;
      }

      // ШАГ 2: Если оба объекта принадлежат к односу языку, 
      // сортируем их алфавитно с учетом флага dir
      return calcNameSortingValue(a, b, isLatin, Boolean(dir));
    });
  }
  else {
    part.sort((a, b) => (
      calcNameSortingValue(a, b, isLatin, Boolean(dir))
    ))
  }
  // мутируем объект по ссылке
}