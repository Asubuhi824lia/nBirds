import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import type { OptionType } from "../../data/types";

// общие названия семейств — по форме (корню)
// указывать кол-во для каждого таба — (+общее?)
const nameRootFamilies = [
  "свиристел",
  "синиц",
  "певун",
  "птиц",
  "медосос", // + alt_name
  "пополз", // + alt_name
  "тимел",
  "пищух",
  "славк",
  "ткач",
  "вьюр",
  "сорокопут",
  "толстоголовк", // род
  "глаз",
  "хвост",
]

export const NamePartSelect = ({
  value = -1,
  onChange
}: {
  value?: number | null,
  onChange: (option: OptionType | null) => void
}) => {
  const label = "Корни названий";
  const prefix = "root-name";

  return (
    <>
      <p>Сортировка</p>
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        <InputLabel htmlFor={`${prefix}-select`}>{label}</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id={`${prefix}-select`}
          value={value}
          label={label}
          onChange={({ target: { value } }) =>
            onChange({
              value: value as number,
              label: nameRootFamilies[value as number]
            })}
        >
          <MenuItem key={`name-root-item-null`} value={-1} defaultChecked><em>None</em></MenuItem>
          {nameRootFamilies.map((nameRoot, id) => (
            <MenuItem key={`name-root-item-${id}`} value={id}>{nameRoot}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}