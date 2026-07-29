// TODO: ! выделять цветом корни каждого слова

import { Typography } from "@mui/material"
import { RadioGroupName, type RadioGroupNameProps } from "./RadioGroupName"
import { prefixGroup } from "./data"

// TODO: названия "семейств", соотв. названиям "родов"

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