import { Button, Stack, styled, Switch, Typography } from "@mui/material"
import { Direction } from "./SortNaming";
import { Download, Upload } from "@mui/icons-material";
// TODO: почему enum по уполчанию импортируется как тип, если это не единственный способ импорта? Как переменить?

interface LabelDirSwitch {
  type?: "primary" | "secondary";
  isDisabled?: boolean;
  isChecked: boolean;
  handleChangeDirection: (dir: Direction) => void;
}

export const LabelDirSwitch = ({
  type = "primary",
  isDisabled,
  isChecked,
  handleChangeDirection,
}: LabelDirSwitch) => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Button variant="text" color="inherit" size="small" onClick={() => handleChangeDirection(Direction.ASC)} sx={{ minWidth: 0 }}>
        <Typography>ASC</Typography>
      </Button>
      <DirectionSwitch
        checked={!!isChecked}
        disabled={isDisabled}
        size="medium"
        onChange={() => handleChangeDirection(Number(!isChecked) as Direction)} // XOR
        icon={<Download color={isDisabled ? "disabled" : "action"} sx={{ borderRadius: "100%", padding: "2px", bgcolor: isDisabled ? "lightgray" : (type === "primary" ? "chocolate" : "lightseagreen"), color: "beige" }} />}
        checkedIcon={<Upload color={isDisabled ? "disabled" : "action"} sx={{ borderRadius: "100%", padding: "2px", bgcolor: isDisabled ? "lightgray" : (type === "primary" ? "crimson" : "darkcyan"), color: "beige" }} />}
      />
      <Button variant="text" color="inherit" size="small" onClick={() => handleChangeDirection(Direction.DESC)} sx={{ minWidth: 0 }}>
        <Typography>DESC</Typography>
      </Button>
    </Stack>
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