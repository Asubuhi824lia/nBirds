import type { SxProps, Theme } from "@mui/material";
import { colors, nameRootGroups } from "./data";

// TODO: для обобщения нужен +арг. массива цветов || "colors" - дефолтный
export const setStyleSelectItem = (groupId: number): SxProps<Theme> => ({
  "&.Mui-selected": {
    backgroundColor: getOptionColor(groupId),
    '&:hover': {
      backgroundColor: getOptionColor(groupId, true)
    }
  }
});

export function getOptionColorFromValue(value: string, isLight?: boolean) {
  const groupId =
    nameRootGroups
      .find(({ roots }) => roots.includes(value))
      ?.id;
  return getOptionColor(groupId ?? 0, isLight);
}
export function getOptionColor(groupId: number = 0, isLight?: boolean) {
  return colors[(groupId) % colors.length][isLight ? 100 : 200];
}