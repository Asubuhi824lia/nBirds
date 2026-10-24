import { nameRootGroups } from "@shared/data";
import { ItemType, type NameRootGroup } from "./types"

import {
  red, orange,
  teal, green, lime,
  cyan, blue, indigo,
  grey, brown, purple,
  pink, yellow, blueGrey
} from "@mui/material/colors";

export const colors = [
  red, orange,
  teal, green, lime,
  cyan, blue, indigo,
  grey, brown, purple,
  pink, yellow, blueGrey
];

/** Для локальных констант
 * 
 * "имяКомпонента" + "название"
 * 
 * Названия
 * - label
 * - prefix
 */
export const NamePartLabel = "Корни названий";
export const NamePartPrefix = "root-name";

// ± API
export const items: NameRootGroup[] = nameRootGroups.map((group) => [
  {
    groupId: group.id,
    type: ItemType.ListSubheader,
    label: group.title
  },
  ...group.roots.map((root) => ({
    groupId: group.id,
    type: ItemType.MenuItem,
    label: root
  }))
])
  .reduce((acc, group) => [...acc, ...group], [])