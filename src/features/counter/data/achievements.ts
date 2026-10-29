const order_name = "Воробьинообразных";

export const prefix: Record<string, "MAX" | "COMPLETED" | "HALF" | "WITH"> = {
  MAX: "MAX",
  COMPLETED: "COMPLETED",
  HALF: "HALF",
  WITH: "WITH",
}

export const achievements = {
  [prefix.HALF + `_FAMILIES`]: `Пройдена половина от количества всех семейств ${order_name}!`,
  [prefix.HALF + `_SPECIES`]: `Пройдена половина от количества всех видов ${order_name}!`,
  [prefix.HALF + `_SPECIES_LENGTH`]: `Пройдены семейства, что содержали видов меньше, чем вдвое относительно самого многочисленного!`,

  [prefix.COMPLETED + `_FIRST_TEN`]: `Пройдены все семейства отряда ${order_name}, содержащие меньше 10 видов!`,
  [prefix.COMPLETED + `_FIRST_FIFTY`]: `Пройдены все семейства отряда ${order_name}, содержащие меньше 50 видов!`,
  [prefix.COMPLETED + `_FIRST_HUNDRED`]: `Пройдены все семейства отряда ${order_name}, содержащие меньше 100 видов!`,

  [prefix.WITH + `_FIRST_TEN`]: `Достигнуто число, равное количеству групп, семейства в которых содержат до 10 видов!`,
  [prefix.WITH + `_FIRST_FIFTY`]: `Достигнуто число, равное количеству групп, семейства в которых содержат до 50 видов!`,
  [prefix.WITH + `_FIRST_HUNDRED`]: `Достигнуто число, равное количеству групп, семейства в которых содержат до 100 видов!`,

  [prefix.MAX + `_GROUPS`]: `Достигнуто число, равное количеству групп семейств в отряде ${order_name} по соответствию с количеством видов!`,
  [prefix.MAX + `_FAMILIES`]: `Достигнуто число, равное количеству семейств в отряде ${order_name}!`,
  [prefix.MAX + `_SPECIES`]: `Достигнуто число, равное количеству видов в самом крупном семействе отряда ${order_name}!`
};

export const achievementsTitle = {
  [prefix.HALF + `_FAMILIES`]: `Половина "семейств" отряда!`,
  [prefix.HALF + `_SPECIES`]: `Половина "видов" отряда!`,
  [prefix.HALF + `_SPECIES_LENGTH`]: `Расцвет многообразия`,

  [prefix.COMPLETED + `_FIRST_TEN`]: `Первая десятка!`,
  [prefix.COMPLETED + `_FIRST_FIFTY`]: `Первый полтинник!`,
  [prefix.COMPLETED + `_FIRST_HUNDRED`]: `Первая сотня!`,

  [prefix.WITH + `_FIRST_TEN`]: "Группы первой десятки!",
  [prefix.WITH + `_FIRST_FIFTY`]: "Группы первого полтинника!",
  [prefix.WITH + `_FIRST_HUNDRED`]: "Группы первой сотни!",

  [prefix.MAX + `_GROUPS`]: `Итого групп`,
  [prefix.MAX + `_FAMILIES`]: `Итого семейств`,
  [prefix.MAX + `_SPECIES`]: `Максимум видового разнообразия!`
}

export const achievementsSign = {
  [prefix.HALF + `_FAMILIES`]: "½F",
  [prefix.HALF + `_SPECIES`]: "½S",
  [prefix.HALF + `_SPECIES_LENGTH`]: "len",

  [prefix.COMPLETED + `_FIRST_TEN`]: "10",
  [prefix.COMPLETED + `_FIRST_FIFTY`]: "50",
  [prefix.COMPLETED + `_FIRST_HUNDRED`]: "100",

  [prefix.WITH + `_FIRST_TEN`]: null,
  [prefix.WITH + `_FIRST_FIFTY`]: null,
  [prefix.WITH + `_FIRST_HUNDRED`]: null,

  [prefix.MAX + `_GROUPS`]: "G",
  [prefix.MAX + `_FAMILIES`]: "F",
  [prefix.MAX + `_SPECIES`]: "S"
}