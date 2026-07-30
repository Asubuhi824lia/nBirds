// options

// TODO: +опция "подсвечивать семейства, для которых активны опции"

export const modesNameAlt = [
  { value: "alt_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nглавное название" },
  // названия отображаются отдельным списком ниже главной части (главное название остаётся)
  { value: "alt_names_with_every", label: "Показывать для каждого" }, // Fully Optional
  // не отображается список альтернативных названий
  // при отсутствии "главного названия" показывается только латинское, даже при наличии альтернатив на рус.
  // при отсутствии "главного названия" И включённой опции "latin_names_without" не показывать семейства без "главного названия"
  { value: "alt_names_without", label: "Не показывать совсем" },
  // TODO: показ альтернативных названий отдельным списком - И при отсутствии "главного названия" в "главной части" латинское
]
export const modesNameLatin = [
  { value: "latin_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nлюбое название" },
  { value: "latin_names_with_every", label: "Показывать для каждого" }, // Fully Optional
  // при отсутствии "главного названия" И включённой опции "alt_names_without" не показывать семейство
  { value: "latin_names_without", label: "Не показывать совсем" },
  /**
   * При выборе опции значение в modesNameAlt...
   * - устанавливается в "alt_names_without"
   * - кнопки блокируются
   */
  { value: "latin_names_only", label: "Только латынь" }
]

export const defaultValueAlt = modesNameAlt[0].value;
export const defaultValueLatin = modesNameLatin[0].value;