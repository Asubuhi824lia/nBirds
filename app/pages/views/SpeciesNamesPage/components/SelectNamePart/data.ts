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

export const dash = "—";

// ± DB
export const nameRootGroups = [
  // 0 _ "запасное" число, на случай отсутствия явного указания
  {
    id: 1,
    title: dash, //TODO: перепродумать название
    roots: [
      "птиц",
    ]
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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