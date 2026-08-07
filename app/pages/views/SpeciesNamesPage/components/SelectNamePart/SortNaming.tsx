import { Download, Upload } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, Stack, styled, Switch, Typography } from "@mui/material";
import { useState } from "react";

export enum Direction { ASC, DESC };

interface SortNamingProps {
  dir: boolean;
  isSortDisabled: boolean;
  typeNameLatin: string;
  handleNameSorted: (dir: boolean) => void;
  handleSeparatelyChanged: (isSeparately: boolean) => void;
}

export const SortNaming = ({
  dir,
  isSortDisabled = false,
  typeNameLatin,
  handleNameSorted,
  handleSeparatelyChanged
}: SortNamingProps) => {
  // isSortSeparately — локальный стейт
  // внешнее — для сортировки
  const [isSortSeparately, setIsSortSeparately] = useState(false);

  return (
    <section>
      <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Сортировка</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={isSortSeparately}
            disabled={["latin_names_only", "latin_names_without"].includes(typeNameLatin) || isSortDisabled}
            // TODO: дубль стейта?..
            onChange={({ target: { checked } }) => {
              setIsSortSeparately(checked);
              handleSeparatelyChanged(checked);
            }}
          />
        }
        label="Латынь в конце"
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Button variant="text" color="inherit" size="small" onClick={() => handleNameSorted(!!Direction.ASC)} sx={{ minWidth: 0 }}>
          <Typography>ASC</Typography>
        </Button>
        {/* <DirectionSwitch /> */}
        <DirectionSwitch
          checked={!!dir}
          disabled={isSortDisabled}
          size="medium"
          onChange={() => handleNameSorted(!dir)}
          icon={<Download color={isSortDisabled ? "disabled" : "action"} sx={{ borderRadius: "100%", padding: "2px", bgcolor: isSortDisabled ? "lightgray" : "chocolate", color: "beige" }} />}
          checkedIcon={<Upload color={isSortDisabled ? "disabled" : "action"} sx={{ borderRadius: "100%", padding: "2px", bgcolor: isSortDisabled ? "lightgray" : "crimson", color: "beige" }} />}
        />
        <Button variant="text" color="inherit" size="small" onClick={() => handleNameSorted(!!Direction.DESC)} sx={{ minWidth: 0 }}>
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