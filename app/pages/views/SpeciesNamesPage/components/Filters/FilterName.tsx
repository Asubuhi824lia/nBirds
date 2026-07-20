// TODO: ! выделять цветом корни каждого слова

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { useState } from "react"

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

// TODO: названия "семейств", соотв. названиям "родов"

const modesNameAlt = [
  { value: "alt_names_without", label: "Не показывать" },
  { value: "alt_names_with", label: "Добавить" },
]
const modesNameLatin = [
  { value: "latin_names_with_only", label: "Показывать при отсутствии локализации" },
  { value: "latin_names_with_every", label: "Показывать для каждого" },
  { value: "latin_names_without", label: "Без латыни" },
  { value: "latin_names_only", label: "Только латынь" }
]

const defaultValueAlt = modesNameAlt[0].value;
const defaultValueLatin = modesNameLatin[0].value;

// TODO: чделать вывод колонкой !фиксированного! местоположения справа
export const FilterName = () => {
  const prefixGroup = "radio-group-name";

  // TODO: задать типами перечени значений value из modesNameAlt или modesNameLatin
  const [typeNameAlt, setTypeNameAlt] = useState(defaultValueAlt);
  const [typeNameLatin, setTypeNameLatin] = useState(defaultValueLatin);

  return (
    <section style={{ maxWidth: "350px" }}>
      {/* Показывать... */}
      {/* TODO: "Режим" просмотра — переформулировать */}
      <Typography>Режим просмотра</Typography>

      <FormControl>
        <FormLabel id={`${prefixGroup}-alt`}>Альтернативные имена</FormLabel>
        {/* TODO: вывести в общий компонент */}
        <RadioGroup name={`${prefixGroup}-alt`} defaultValue={defaultValueAlt}>
          {modesNameAlt.map((mode, index) => (
            <FormControlLabel
              key={`${prefixGroup}-alt-item-${index}`}
              value={mode.value}
              label={mode.label}
              checked={typeNameAlt === mode.value}
              control={<Radio size="small" onChange={e => setTypeNameAlt(e.target.value)} />}
              slotProps={{ typography: { sx: { fontSize: ".9rem" } } }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id={`${prefixGroup}-latin`}>Латинские имена</FormLabel>
        <RadioGroup name={`${prefixGroup}-latin`} defaultValue={defaultValueLatin}>
          {modesNameLatin.map((mode, index) => (
            <FormControlLabel
              key={`${prefixGroup}-latin-item-${index}`}
              value={mode.value}
              label={mode.label}
              checked={typeNameLatin === mode.value}
              control={<Radio size="small" onChange={e => setTypeNameLatin(e.target.value)} />}
              slotProps={{ typography: { sx: { fontSize: ".9rem" } } }}
            />
          ))}
        </RadioGroup>
      </FormControl>
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