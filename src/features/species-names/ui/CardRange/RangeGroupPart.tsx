import { Grid, List, Typography } from "@mui/material";
import type { FamilyPartStruct, RootGroupType } from "@shared/lib/utils";
import { RangeGroupPartItem } from "./RangeGroupPartItem/RangeGroupPartItem";
import { getGroupPartById_noApi } from "../../model";
import { Direction } from "../SelectNamePart/components/SortNaming";
import { calcNameSortingValue, calcSpeciesSorting, getIsLatinName } from "../../model/sort";

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
  isSortSpecies: Direction | null;
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
  isSortSpecies,
  isLatin,
  isLatinSeparately
}: RangeGroupPartProps) => {
  const [species_num, part] = getGroupPartById_noApi({ groupId, partId });

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
    isSortSpecies,
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
  isSortSpecies,
  isLatin = false,
  isLatinSeparately,
}: {
  part: FamilyPartStruct[];
  dir: Direction;
  isSortSpecies: Direction | null;
  isLatin?: boolean;
  isLatinSeparately: boolean;
}) {
  /**
   * Двойная Сортировка
   * 1 — для локализации
   * 2 — для латыни
   */
  // Все латинские названия — в конец
  part.sort((a, b) => {
    // ШАГ 1: При закреплённом числе видов — порядок по species_length через isSortSpecies.
    // Одинаковый species_length → 0, дальше шаги 2–3 (латынь / алфавит через dir).
    if (isSortSpecies !== null) {
      const bySpecies = calcSpeciesSorting(a, b, isSortSpecies);
      if (bySpecies !== 0) return bySpecies;
    }

    if (isLatinSeparately) {
      // ШАГ 2: Группировка. Русские названия (isLatin === false) всегда должны быть перед латинскими (isLatin === true)
      const isALatin = getIsLatinName(a);
      const isBLatin = getIsLatinName(b);

      if (isALatin !== isBLatin) {
        // Если a - это латынь, она должна идти после b (возвращаем 1).
        // Если b - это латынь, a должна идти перед b (возвращаем -1).
        return isALatin ? 1 : -1;
      }
    }

    // ШАГ 3: Алфавит (dir) — всегда; в т.ч. при неактивном «По числу видов»
    // и внутри блоков с одинаковым species_length.
    return calcNameSortingValue(a, b, isLatin, Boolean(dir));
  })
}