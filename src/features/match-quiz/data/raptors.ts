import type { MatchLevel } from "../model/types";

/** Demo level: Хищные птицы */
export const raptorsLevel: MatchLevel = {
  id: "raptors",
  title: "Хищные птицы",
  description:
    "Охота, клюв и крыло — признаки дневных и ночных хищников.",
  questions: [
    {
      id: "q-hunt",
      prompt: "Сопоставьте приём охоты с группой",
      blocks: [
        { id: "falcon", keyword: "Соколиные", capacity: 2 },
        { id: "eagle", keyword: "Орлиные", capacity: 2 },
        { id: "owl", keyword: "Совы", capacity: 2 },
      ],
      options: [
        { id: "opt-stoop", label: "Пикирование", blockId: "falcon" },
        { id: "opt-aerial", label: "Воздушная схватка", blockId: "falcon" },
        { id: "opt-soar", label: "Парение", blockId: "eagle" },
        { id: "opt-seize", label: "Хват с высоты", blockId: "eagle" },
        { id: "opt-silent", label: "Бесшумный полёт", blockId: "owl" },
        { id: "opt-ambush", label: "Засада ночью", blockId: "owl" },
      ],
    },
    {
      id: "q-traits",
      prompt: "Сопоставьте признак с типом хищника",
      blocks: [
        { id: "diurnal", keyword: "Дневные", capacity: 3 },
        { id: "nocturnal", keyword: "Ночные", capacity: 2 },
      ],
      options: [
        { id: "opt-keen-sight", label: "Острое зрение", blockId: "diurnal" },
        { id: "opt-hooked", label: "Крючковатый клюв", blockId: "diurnal" },
        { id: "opt-talons", label: "Сильные когти", blockId: "diurnal" },
        { id: "opt-facial-disk", label: "Лицевой диск", blockId: "nocturnal" },
        { id: "opt-soft-plumage", label: "Мягкое оперение", blockId: "nocturnal" },
      ],
    },
  ],
};
