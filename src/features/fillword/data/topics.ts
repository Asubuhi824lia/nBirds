import { DEFAULT_GRID_CONFIG } from "../model/config";
import type { FillwordTopic } from "../model/types";

/** Built-in topics (bird-themed). */
export const builtinFillwordTopics: FillwordTopic[] = [
  {
    id: "passerine-families",
    title: "Семейства воробьиных",
    description: "Названия семейств Passeriformes без пробелов.",
    words: [
      "ДРОЗДОВЫЕ",
      "СИНИЦЕВЫЕ",
      "ВРАНОВЫЕ",
      "СЛАВКОВЫЕ",
      "МУХОЛОВКОВЫЕ",
      "ВЬЮРКОВЫЕ",
      "ОВСЯНКОВЫЕ",
      "ТРЯСОГУЗКОВЫЕ",
      "ЖАВОРОНКОВЫЕ",
      "СКВОРЦОВЫЕ",
      "ЛАСТОЧКИ",
      "ИВОЛГОВЫЕ",
    ],
    config: { ...DEFAULT_GRID_CONFIG, rows: 14, cols: 14 },
  },
  {
    id: "latin-families",
    title: "Латинские семейства",
    description: "Латинские названия семейств птиц.",
    words: [
      "TURDIDAE",
      "PARIDAE",
      "CORVIDAE",
      "SYLVIIDAE",
      "MUSCICAPIDAE",
      "FRINGILLIDAE",
      "EMBERIZIDAE",
      "MOTACILLIDAE",
      "ALAUDIDAE",
      "STURNIDAE",
      "HIRUNDINIDAE",
      "ORIOLIDAE",
    ],
    config: { ...DEFAULT_GRID_CONFIG, rows: 14, cols: 14 },
  },
  {
    id: "bird-parts",
    title: "Части птицы",
    description: "Анатомия и внешние признаки.",
    words: [
      "КЛЮВ",
      "КРЫЛО",
      "ХВОСТ",
      "ОЧИ",
      "ПЕРО",
      "КОГОТЬ",
      "ГРЕБЕНЬ",
      "ШПОРА",
      "ЗОБ",
      "ЛАПА",
    ],
    config: { ...DEFAULT_GRID_CONFIG, rows: 10, cols: 10 },
  },
  // Воробьинообразные: систематика
  {
    "id": "надсемейство-muscicapoidea",
    "title": "Надсемейство Muscicapoidea (2019 г.)",
    "description": "Уникальные названия типовых видов семейств надсемейства (6 / 7)",
    "words": [
      "ВОЛОКЛЮЙ",
      "ДРОЗД",
      "МУХОЛОВКА",
      "ОЛЯПКА",
      "ПЕРЕСМЕШНИК",
      "СКВОРЕЦ",
    ],
    "config": {
      "rows": 11,
      "cols": 11,
      "allowReverse": true,
      "allowDiagonal": true,
      "allowOverlap": false,
      "fillBlanks": false,
      "allowTurns": false
    }
  }
];

export function getBuiltinTopic(id: string): FillwordTopic | undefined {
  return builtinFillwordTopics.find((t) => t.id === id);
}

/** Resolve topic from builtins or localStorage customs. */
export function getFillwordTopic(id: string): FillwordTopic | undefined {
  const builtin = getBuiltinTopic(id);
  if (builtin) return builtin;
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem("nbirds.fillword.customTopics");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as FillwordTopic[];
    if (!Array.isArray(parsed)) return undefined;
    return parsed.find((t) => t?.id === id);
  } catch {
    return undefined;
  }
}
