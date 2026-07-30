// TODO: ! выделять цветом корни каждого слова

import { Typography } from "@mui/material"
import { RadioGroupName, type RadioGroupNameProps } from "./RadioGroupName"
import { prefixGroup } from "./data"

// TODO: названия "семейств", соотв. названиям "родов"

// TODO: +фильтр по "группам этимологий"
// 1) показывать в обычной сортировке
// 2) показывать только те, в которых есть явная этимологическая часть (бесХВОСТковые, ТКАЧиковые)
// 3) показывать названия с явной этимологической частью и без отдельно 
//    - "без" - сверху, "с" - внизу
//    - "с" - сверху, "без" - внизу

// TODO: +сортировка DESC/ASC (в пределах одного числа видов)
// TODO: +фильтр "отделить не повторяющиеся" (опции как по "группам этимологий")
export const FiltersNaming = ({ filterGroups }: { filterGroups: RadioGroupNameProps[] }) => {
  return (
    <section style={{ maxWidth: "350px" }}>
      {/* Показывать... */}
      {/* TODO: "Режим" просмотра — переформулировать */}
      <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Режим просмотра</Typography>

      {filterGroups.map((group, ind) => (
        <RadioGroupName key={`${prefixGroup}-${ind}`} {...group} />
      ))}
    </section>
  )
}