// TODO: ! выделять цветом корни каждого слова

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"

// TODO: to the extra file

// общие названия семейств — по форме (корню)
// указывать кол-во для каждого таба — (+общее?)
const nameRootFamilies = [
  "свиристел",
  "синиц",
  "сорокопут",
  "толстоголовк", // род
  "певун",
  "птица",
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

const prefixGroup = "radio-group-name";

// TODO: названия "семейств", соотв. названиям "родов"

// TODO: чделать вывод колонкой !фиксированного! местоположения справа
export const FiltersNaming = ({ filterGroups }: { filterGroups: RadioGroupNameProps[] }) => {
  return (
    <section style={{ maxWidth: "350px" }}>
      {/* Показывать... */}
      {/* TODO: "Режим" просмотра — переформулировать */}
      <Typography>Режим просмотра</Typography>

      {filterGroups.map((group, ind) => (
        <RadioGroupName key={`${prefixGroup}-${ind}`} {...group} />
      ))}
    </section>
  )
}

// with_count

// without_alt_names
//    with_alt_names
//      only_latin_names
//   without_latin_names
// with_only_latin_names

// NON-LATIN
// only_one_word
// + "включая alt_name"
// only_two_words
// + "включая alt_name"

/** TODO: 
 *  
 * если "русское название" = "калька с латинской" | +LLM
 */

// TODO: prefixGroup
export interface RadioGroupNameProps {
  id: "alt" | "latin";
  title: "Альтернативные имена" | "Латинские имена";
  actualType: string;
  onChangeActualType: (value: string) => void;
  modesName: Array<{
    value: string;
    label: string;
    hint?: string;
  }>;
  DEFAULT_INDEX?: number;
}

function RadioGroupName({
  id,
  title,
  actualType,
  onChangeActualType,
  modesName,
  DEFAULT_INDEX = 0
}: RadioGroupNameProps) {
  return (
    <FormControl>
      <FormLabel id={`${prefixGroup}-${id}`}>{title}</FormLabel>
      <RadioGroup name={`${prefixGroup}-${id}`} defaultValue={modesName[DEFAULT_INDEX].value}>
        {modesName.map((mode, index) => (
          <FormControlLabel
            key={`${prefixGroup}-${id}-item-${index}`}
            value={mode.value}
            label={mode.label}
            title={mode.hint}
            checked={actualType === mode.value}
            control={<Radio size="small" onChange={e => onChangeActualType(e.target.value)} />}
            slotProps={{ typography: { sx: { fontSize: ".9rem" } } }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}