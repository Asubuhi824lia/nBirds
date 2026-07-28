import { Box, Chip, FormControl, InputLabel, ListSubheader, MenuItem, Select, Typography } from "@mui/material"
import { items, NamePartPrefix as prefix, NamePartLabel as label, colors } from "./data";


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
 *    .* при выборе nameRoots, всех из группы "subheader", заменить на отдельный "Chip" с вертикальным списом с возможностью убрать *)
 * -----
 * //Багфиксы
 * //Рефакторинг
 */
export const SelectNamePart = ({
  curValue = [],
  onChange
}: {
  curValue: string[],
  onChange: (value: string[]) => void
}) => {

  return (
    <section>
      {/* TODO: "Сортировка" — переформулировать */}
      <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Сортировка</Typography>
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        <InputLabel htmlFor={`${prefix}-select`} id={`${prefix}-select-label`} shrink>{label}</InputLabel>
        <Select
          multiple
          fullWidth
          displayEmpty
          // клик по label даёт клик по select
          labelId={`${prefix}-select-label`}
          id={`${prefix}-select`}
          value={curValue}
          // задаёт отступ для label у линии select
          label={label}
          onChange={({ target: { value } }) =>
            onChange(
              typeof value === 'string' ? value.split(',') : value
            )
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected.length === 0)
                ? <em>None</em>
                : selected.map((value, i) => (
                  <Chip key={value} label={value} sx={{ bgcolor: colors[i % colors.length][100] }} />
                ))
              }
            </Box>
          )}
        >
          <MenuItem key={`${prefix}-group-null`} value="" disabled defaultChecked><em>None</em></MenuItem>
          {/* `index` не последовательный для `MenuItem` */}
          {items.map(({ label, type }, index) =>
            type
              ? <ListSubheader key={`${prefix}-subheader-${index}`}>{label}</ListSubheader>
              : (
                <MenuItem key={`${prefix}-item-${index}`} value={label}>{label}</MenuItem>
              ))}
        </Select>
      </FormControl>
    </section >
  )
}