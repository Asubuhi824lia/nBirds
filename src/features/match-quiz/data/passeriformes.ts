import type { MatchLevel } from "../model/types";

/** Demo level: Воробьинообразные — keyword ↔ option.id / blockId validation */
export const passeriformesLevel: MatchLevel = {
  id: "passeriformes",
  title: "Воробьинообразные",
  description:
    "Гнёзда, пение и питание — сопоставьте признаки с ключевыми словами отряда.",
  questions: [
    {
      id: "q-nests",
      prompt: "Сопоставьте признаки с типом гнезда",
      blocks: [
        { id: "cup", keyword: "Чашевидное", capacity: 3 },
        { id: "cavity", keyword: "Дупло", capacity: 2 },
        { id: "dome", keyword: "Куполообразное", capacity: 2 },
      ],
      options: [
        { id: "opt-soft-lining", label: "Мягкая выстилка", blockId: "cup" },
        { id: "opt-open-rim", label: "Открытый край", blockId: "cup" },
        { id: "opt-twigs", label: "Веточки снаружи", blockId: "cup" },
        { id: "opt-tree-hole", label: "Древесная ниша", blockId: "cavity" },
        { id: "opt-narrow-entry", label: "Узкий вход", blockId: "cavity" },
        { id: "opt-side-door", label: "Боковой лаз", blockId: "dome" },
        { id: "opt-woven-roof", label: "Плетёный свод", blockId: "dome" },
      ],
    },
    {
      id: "q-songs",
      prompt: "Сопоставьте описание с характером пения",
      blocks: [
        { id: "trill", keyword: "Трель", capacity: 2 },
        { id: "whistle", keyword: "Свист", capacity: 2 },
        { id: "warble", keyword: "Щебет", capacity: 3 },
      ],
      options: [
        { id: "opt-rapid-notes", label: "Частые ноты", blockId: "trill" },
        { id: "opt-vibrato", label: "Вибрато", blockId: "trill" },
        { id: "opt-clear-tone", label: "Чистый тон", blockId: "whistle" },
        { id: "opt-long-phrase", label: "Длинная фраза", blockId: "whistle" },
        { id: "opt-varied", label: "Пестрая смена", blockId: "warble" },
        { id: "opt-soft-chatter", label: "Мягкий говор", blockId: "warble" },
        { id: "opt-short-bursts", label: "Короткие вспышки", blockId: "warble" },
      ],
    },
    {
      id: "q-diet",
      prompt: "Сопоставьте пищу с типом питания",
      blocks: [
        { id: "insect", keyword: "Насекомоядные", capacity: 3 },
        { id: "seed", keyword: "Зерноядные", capacity: 2 },
        { id: "mixed", keyword: "Всеядные", capacity: 2 },
      ],
      options: [
        { id: "opt-larvae", label: "Личинки", blockId: "insect" },
        { id: "opt-aphids", label: "Тля", blockId: "insect" },
        { id: "opt-beetles", label: "Жуки", blockId: "insect" },
        { id: "opt-grain", label: "Зерно", blockId: "seed" },
        { id: "opt-seeds", label: "Семена трав", blockId: "seed" },
        { id: "opt-berries", label: "Ягоды", blockId: "mixed" },
        { id: "opt-scraps", label: "Крошки", blockId: "mixed" },
      ],
    },
  ],
};
