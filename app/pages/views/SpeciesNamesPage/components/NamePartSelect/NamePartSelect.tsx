import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from "@mui/material"
import type { OptionType } from "../../data/types";

// общие названия семейств — по форме (корню)
// указывать кол-во для каждого таба — (+общее?)
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

export const NamePartSelect = ({
  value = -1,
  onChange
}: {
  value?: number | null, // TODO: | string
  onChange: (option: OptionType | null) => void
}) => {
  const label = "Корни названий";
  const prefix = "root-name";

  enum ItemType { MenuItem = 0, ListSubheader = 1 };

  interface NameRootGroup {
    label: string;
    type: ItemType;
  }
  const items: NameRootGroup[] = nameRootGroups.map((group) => [
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


  return (
    <>
      <p>Сортировка</p>
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        <InputLabel htmlFor={`${prefix}-select`} id={`${prefix}-select`}>{label}</InputLabel>
        <Select
          fullWidth
          // labelId="demo-simple-select-label"//TODO
          labelId={`${prefix}-select`}
          id={`${prefix}-select`}
          value={value}
          label={label}
          onChange={({ target: { value } }) =>
            onChange({
              value: value as number,
              label: value as number > -1 ? items[value as number].label : "None"
            })
          }
        >
          <MenuItem key={`${prefix}-group-null`} value={-1} defaultChecked><em>None</em></MenuItem>
          {/* `index` не последовательный для `MenuItem` */}
          {items.map(({ label, type }, index) =>
            type
              ? <ListSubheader key={`${prefix}-subheader`}>{label}</ListSubheader>
              : (
                <MenuItem key={`${prefix}-item-${index}`} value={index}>{label}</MenuItem>
              ))}
        </Select>
      </FormControl>
    </>
  )
}