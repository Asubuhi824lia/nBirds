import { Download, Upload } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, Stack, styled, Switch, Typography } from "@mui/material";

export enum Direction { ASC, DESC };

interface SortNamingProps {
  isSortDisabled: boolean;
  typeNameLatin: string;

  isSortSpecies: boolean;
  setIsSortSpecies: React.Dispatch<React.SetStateAction<boolean>>

  dir: Direction;
  handleNameSorted: (dir: Direction) => void;

  isLatinSeparately: boolean;
  handleSeparatelyChanged: (isSeparately: boolean) => void;
}

export const SortNaming = ({
  isSortDisabled = false,
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
    <section>
      {/* TODO: когда сортировка ни разу еще не выбрана
      - либо активировать автоматически
      - либо отображати неактив */}
      <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Сортировка</Typography>
      <FormControlLabel
        control={
          <Checkbox
            disabled={dir === Direction.ASC}
            checked={isSortSpecies}
            onChange={({ target: { checked } }) => setIsSortSpecies(checked)}
          />
        }
        // TODO: +визуальное разделение перечня на латыни и локализации
        label="Закрепить число видов"
      />
      <FormControlLabel
        control={
          <Checkbox
            disabled={["latin_names_only", "latin_names_without"].includes(typeNameLatin) || isSortDisabled || dir === Direction.ASC}
            checked={isLatinSeparately}
            onChange={({ target: { checked } }) => handleSeparatelyChanged(checked)}
          />
        }
        // TODO: +визуальное разделение перечня на латыни и локализации
        label="Закрепить латынь в конце"
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Button variant="text" color="inherit" size="small" onClick={() => handleNameSorted(Direction.ASC)} sx={{ minWidth: 0 }}>
          <Typography>ASC</Typography>
        </Button>
        <DirectionSwitch
          checked={!!dir}
          disabled={isSortDisabled}
          size="medium"
          onChange={() => handleNameSorted((dir ^ 1) as Direction)} // XOR
          icon={<Download color={isSortDisabled ? "disabled" : "action"} sx={{ borderRadius: "100%", padding: "2px", bgcolor: isSortDisabled ? "lightgray" : "chocolate", color: "beige" }} />}
          checkedIcon={<Upload color={isSortDisabled ? "disabled" : "action"} sx={{ borderRadius: "100%", padding: "2px", bgcolor: isSortDisabled ? "lightgray" : "crimson", color: "beige" }} />}
        />
        <Button variant="text" color="inherit" size="small" onClick={() => handleNameSorted(Direction.DESC)} sx={{ minWidth: 0 }}>
          <Typography>DESC</Typography>
        </Button>
      </Stack>
    </section>
  )
}

// Switch color Variants
// on: "crimson", off: "chocolate"
// on: "darkcyan", off: "lightseagreen"


// TODO: redisign to the Arrows -_-
const DirectionSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#e2e2e2',
        ...theme.applyStyles('dark', {
          backgroundColor: '#acacac',
        }),
      },
      // '& .MuiSwitch-thumb': {
      //   // backgroundColor: '#003892', // Темно-синий для включенного
      // },
      '& .Mui-disabled': {
        backgroundColor: '#000',
      }
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    display: 'flex',         // Добавляем flex для центрирования иконки
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    // Стили для самой иконки
    '& svg': {
      fontSize: 22,          // Подберите нужный размер
      color: '#fff',         // Цвет иконки
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#e2e2e2',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#acacac',
    }),
    '& .Mui-disabled': {
      backgroundColor: '#000',
    }
  },
}));