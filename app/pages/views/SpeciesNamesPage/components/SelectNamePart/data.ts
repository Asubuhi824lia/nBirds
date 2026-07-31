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

// ± DB
export const nameRootGroups = [
  {
    id: 0,
    title: "—", //TODO: перепродумать название
    roots: [
      "птиц",
    ]
  },
  {
    id: 1,
    title: "Пение",
    roots: [
      "свиристел",
      "синиц",
      "певун",
      "тимел",
      "пищух",
      "славк",
    ]
  },
  {
    id: 2,
    title: "Поведение",
    roots: [
      "ткач",
      "вьюр",
      "медосос", // + alt_name
      "пополз", // + alt_name
      "сорокопут",
    ]
  },
  {
    id: 3,
    title: "Строение",
    roots: [
      "глаз",
      "хвост",
      "толстоголовк", // род
    ]
  }
]

// ± API
export const items: NameRootGroup[] = nameRootGroups.map((group) => [
  {
    type: ItemType.ListSubheader,
    label: group.title
  },
  ...group.roots.map((root) => ({
    type: ItemType.MenuItem,
    label: root
  }))
])
  .reduce((acc, group) => [...acc, ...group], [])