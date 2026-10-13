import type { defaultFormObject } from "../data/defaultData";

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


type BlockPhotoKeys = keyof Pick<FormAddBird, "photoUrls">;
type BlockNamesKeys = keyof typeof defaultFormObject.names;
type BlockFactsKeys = keyof typeof defaultFormObject.facts;

export type FieldsDataIds = {
  blockImages: BlockPhotoKeys,
  blockNames: BlockNamesKeys,
  blockFacts: BlockFactsKeys
}


export type FieldsDataIdsKeys = keyof FieldsDataIds;
// NEW: Indexed Access Type
export type FieldsDataBlocksIdsKeys = FieldsDataIds["blockImages"] | FieldsDataIds["blockNames"] | FieldsDataIds["blockFacts"];

// TODO: выделить напрямую — через типы
export type SingleValueFieldKey = "nameMain" | "nameLatin";
export type MultiValueFieldKey = keyof Omit<AddBirdForm, SingleValueFieldKey>

export type AddBirdForm = {
  photoUrls?: string[] | null,
  photoFiles?: FileList,

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