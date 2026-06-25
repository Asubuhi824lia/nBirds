import type { AddBirdForm, FormAddBird } from "../types"

// TODO: при 1-м рендеринге — заполнение данных со "структуры данных" в "структуру полей"
export const defaultBirdData: AddBirdForm = {
  photoUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Lophophanes_cristatus_-_01.jpg/500px-Lophophanes_cristatus_-_01.jpg"],
  photoFiles: undefined,

  nameLatin: "Lophophanes cristatus",
  nameMain: "Хохлатая синица",
  nameAlternatives: ["Гренадерка", "Гренадёр"],
  nameEtymologies: ["Своё название — гренадер — получила благодаря хорошо заметному коническому хохолку, похожему на шапки гренадеров — элитных пехотинцев XVII—XVIII веков."],

  interestFacts: [],
  statisticFacts: ["В полевых условиях самцы и самки практически не отличимы."],
  similarSpecies: ["Более других видов синиц склонна к оседлому образу жизни."]

}

export const emptyBirdData: AddBirdForm = {
  photoUrls: [],
  photoFiles: undefined,

  nameMain: "",
  nameLatin: "",
  nameAlternatives: [],
  nameEtymologies: [],

  interestFacts: [],
  statisticFacts: [],
  similarSpecies: []
}


// TODO
export const defaultFormObject: FormAddBird = {
  photoUrls: [],
  names: {
    nameMain: "",
    nameLatin: "",
    nameAlternatives: [],
    nameEtymologies: []
  },
  facts: {
    interestFacts: [],
    statisticFacts: [],
    similarSpecies: []
  }
}