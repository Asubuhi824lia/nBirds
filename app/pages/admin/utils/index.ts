// Служебное !

// TODO: document.designMode = "on" — делает всю веб-страницу редактируемой

// TODO: document.referrer — сымитировать хлебные крошки
// возвращает URI страницы, с которой пользователь перешел на текущую страницу.

// TODO: .defaultView — получить window родителя или фрейма кода внутри другого документа

// TODO: .adoptedStyleSheets = [sheet]
// добавление группы "общих" стилей к DOM-/shadow-элементу


// TODO: "securitypolicyviolation" — фиксирование нарушений (на сервер)


export const scrollToOffsetElement = (element: any, offset = 150) => {
  const elemPos = element.getBoundingClientRect().top;
  const offsetPos = elemPos + window.scrollY - offset;

  window.scrollTo({
    top: offsetPos,
    behavior: 'smooth'
  })
}

// TODO: remove?
export interface FormAddBird {
  photoUrls?: string[] | null,
  names: {
    nameMain?: string | null,
    nameLatin: string,
    nameAlternatives?: string[] | null,
    nameEtymologies?: string[] | null
  },
  facts: {
    interestFacts?: string[] | null,
    statisticFacts?: string[] | null,
    similarSpecies?: string[] | null
  }
}

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

export type FormBlocksKeys = keyof FormAddBird; //TODO
export type BlockNames = typeof defaultFormObject.names;
export type BlockPhotoKeys = keyof Pick<FormAddBird, "photoUrls">;
export type BlockNamesKeys = keyof typeof defaultFormObject.names;
export type BlockFactsKeys = keyof typeof defaultFormObject.facts;
export type FormFieldsKeys = BlockNamesKeys | BlockFactsKeys | "photoUrls";

export type FieldsDataIds = {
  blockImages: BlockPhotoKeys,
  blockNames: BlockNamesKeys,
  blockFacts: BlockFactsKeys
}
export type FieldsDataIdsKeys = keyof FieldsDataIds;
// NEW: Indexed Access Type
export type FieldsDataBlocksIdsKeys = FieldsDataIds["blockImages"] | FieldsDataIds["blockNames"] | FieldsDataIds["blockFacts"];

export type SingleValueFieldKey = "photoUrls" | "nameMain" | "nameLatin";

export type AddBirdForm = {
  photoUrls?: string | null,
  nameMain?: string | null,
  nameLatin: string,
  nameAlternatives?: string[] | null,
  nameEtymologies?: string[] | null,
  interestFacts?: string[] | null,
  statisticFacts?: string[] | null,
  similarSpecies?: string[] | null
}

// ************************************************************
// TODO: lifecycle
// "readystatechange" document.readyState === "interactive"
// | "DOMContentLoaded" 
// | window.onload
// DOM построено. Идеально для навешивания обработчиков событий, манипуляций с DOM
// "readystatechange" document.readyState === "complete"
// Страница и все ресурсы (картинки, стили) загружены. Идеально для получения размеров