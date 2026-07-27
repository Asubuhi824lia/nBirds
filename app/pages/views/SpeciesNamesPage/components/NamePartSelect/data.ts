import { ItemType, type NameRootGroup } from "./types"

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
const nameRootGroups = [
  {
    title: "—", //TODO: перепродумать название
    roots: [
      "птиц",
    ]
  },
  {
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