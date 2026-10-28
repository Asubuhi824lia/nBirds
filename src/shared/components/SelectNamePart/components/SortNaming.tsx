import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { LabelDirSwitch } from "./LabelDirSwitch";

export enum Direction { ASC, DESC };

interface SortNamingProps {
  isDisabledSortLatin: boolean;
  isDisabledSortSpecies: boolean;
  typeNameLatin: string;

  isSortSpecies: Direction | null;
  setIsSortSpecies: React.Dispatch<React.SetStateAction<Direction | null>>

  dir: Direction;
  handleNameSorted: (dir: Direction) => void;

  isLatinSeparately: boolean;
  handleSeparatelyChanged: (isSeparately: boolean) => void;
}

export const SortNaming = ({
  isDisabledSortLatin = false,
  isDisabledSortSpecies = false,
  typeNameLatin,
  // TODO: -> isFixedPlacementLatin
  isSortSpecies,
  setIsSortSpecies,

  dir,
  handleNameSorted,

  isLatinSeparately,
  handleSeparatelyChanged
}: SortNamingProps) => {
  return (
    <Stack direction="column" spacing={2}>
      {/* TODO: когда сортировка ни разу еще не выбрана
      - либо активировать автоматически
      - либо отображати неактив */}
      <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Сортировка</Typography>
      <LabelDirSwitch
        isChecked={!!dir}
        isDisabled={isDisabledSortLatin}
        handleChangeDirection={handleNameSorted}
      />
      <FormControlLabel
        control={
          <Checkbox
            disabled={["latin_names_only", "latin_names_without"].includes(typeNameLatin) || isDisabledSortLatin || dir === Direction.ASC}
            checked={isLatinSeparately}
            onChange={({ target: { checked } }) => handleSeparatelyChanged(checked)}
            sx={{ paddingLeft: 0 }}
          />
        }
        // TODO: +визуальное разделение перечня на латыни и локализации
        label="Латынь в конце"
      />
      <Stack direction="column">
        <FormControlLabel
          control={
            <Checkbox
              disabled={isDisabledSortSpecies}
              checked={isSortSpecies !== null}
              onChange={({ target: { checked } }) => setIsSortSpecies(checked ? Direction.ASC : null)}
              sx={{ paddingLeft: 0 }}
            />
          }
          // TODO: +визуальное разделение перечня на латыни и локализации
          label="Закрепить число видов"
          sx={{ margin: 0 }}
        />
        {(isSortSpecies !== null) && (
          <LabelDirSwitch
            type="secondary"
            isChecked={!!isSortSpecies}
            isDisabled={isDisabledSortSpecies}
            handleChangeDirection={setIsSortSpecies}
          />
        )}
      </Stack>
    </Stack>
  )
}
