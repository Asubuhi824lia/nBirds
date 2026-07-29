// options

export const modesNameAlt = [
  { value: "alt_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nглавное название" },
  { value: "alt_names_with_every", label: "Показывать для каждого" },
  { value: "alt_names_without", label: "Не показывать совсем" },
]
export const modesNameLatin = [
  { value: "latin_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nлюбое название" },
  { value: "latin_names_with_every", label: "Показывать для каждого" },
  { value: "latin_names_without", label: "Не показывать совсем" },
  { value: "latin_names_only", label: "Только латынь" }
]

export const defaultValueAlt = modesNameAlt[0].value;
export const defaultValueLatin = modesNameLatin[0].value;