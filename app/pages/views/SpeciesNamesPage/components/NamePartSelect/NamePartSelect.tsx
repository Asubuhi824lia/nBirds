import { FormControl, InputLabel, ListSubheader, MenuItem, Select, Typography } from "@mui/material"
import type { OptionType } from "../../data/types";
import { items, NamePartPrefix as prefix, NamePartLabel as label } from "./data";

// общие названия семейств — по форме (корню)
// указывать кол-во для каждого таба — (+общее?)


// TODO:
// + multiple: отдельная часть — отдельным цветом
/** 1. подготовить цвета — в кол-ве items.length штук
 *    .1 + возм-ть выбрать ВСЕ
 *    .2 + возм-ть очистить ВСЕ
 *    .3 + возм-ть выбрать цвет из палитры 
 *  2. multiple — при выборе значения + строка с ним, опцию в disabled
 *    .? строкой? Select`ом?
 * -----
 * //Багфиксы
 * //Рефакторинг
 */
export const NamePartSelect = ({
  value = -1,
  onChange
}: {
  value?: number | null, // TODO: | string
  onChange: (option: OptionType | null) => void
}) => {
  return (
    <section>
      {/* TODO: "Сортировка" — переформулировать */}
      <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Сортировка</Typography>
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        <InputLabel htmlFor={`${prefix}-select`} id={`${prefix}-select-label`}>{label}</InputLabel>
        <Select
          fullWidth
          // клик по label даёт клик по select
          labelId={`${prefix}-select-label`}
          id={`${prefix}-select`}
          value={value}
          // задаёт отступ для label у линии select
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
    </section>
  )
}