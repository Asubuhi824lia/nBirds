import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import type { OptionType } from "../../data/types";

// общие названия семейств — по форме (корню)
// указывать кол-во для каждого таба — (+общее?)
const nameRootFamilies = [
  "свиристел",
  "синиц",
  "сорокопут",
  "толстоголовк", // род
  "певун",
  "птиц",
  "медосос", // + alt_name
  "хвост",
  "пополз", // + alt_name
  "тимел",
  "пищух",
  "славк",
  "глаз",
  "ткач",
  "вьюр",
]

export const NamePartSelect = ({
  value,
  onChange
}: {
  value?: number | null,
  onChange: ({ value, label }: OptionType) => void
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
          {nameRootFamilies.map((nameRoot, id) => (
            <MenuItem key={`name-root-item-${id}`} value={id}>{nameRoot}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}