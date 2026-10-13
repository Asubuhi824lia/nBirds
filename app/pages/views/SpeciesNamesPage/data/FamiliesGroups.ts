import { GroupFamiliesTo5 } from "./GroupFamiliesTo5";
import { GroupFamiliesTo20 } from "./GroupFamiliesTo20";
import type { FamiliesGroup } from "./types";

// TODO: REDO
/**
 * Flow: 
 *  SpeciesNamesPage => TabLabel (group) => max_species_length / min_species_length
 * 
 *  SpeciesNamesPage => CardRange(group) =**>  ListItemGroup (family) => ItemInfoMain & ItemInfoAddition (family) => ...
 *  ... => ItemInfoMain => { species_length }
 *  ... => ItemInfoAddition => { latin_name / alternative_names }
 * 
 * * — 1 modif. 
 */

export const FamiliesGroups: Array<FamiliesGroup> = [
  GroupFamiliesTo5,   // to 5   [1, 5)
  GroupFamiliesTo20,  // to 20  [5, 20)

  // [20, 49)
  {
    families: [
      {
        name: "Вдовушковые",
        latin_name: "Viduidae",
        species_length: 20,
      },
      {
        name: "Ласточковые сорокопуты",
        latin_name: "Artamidae",
        alternative_names: ["Артамовые"],
        species_length: 24,
      },
      {
        name: "Дронговые",
        latin_name: "Dicruridae",
        species_length: 28,
      },
      {
        name: "Шалашниковые",
        latin_name: "Ptilonorhynchidae",
        alternative_names: ["Беседковые птицы", "Птицы-шалашники", "Беседковые", "Шалашники"],
        species_length: 28,
      },
      {
        name: "Поползневые",
        latin_name: "Sittidae",
        species_length: 29,
      },
      {
        name: "Сережкоглазки",
        latin_name: "Platysteiridae",
        species_length: 31,
      },
      {
        name: "Ширококрылые камы́шевки",
        latin_name: "Cettiidae",
        species_length: 31,
      },
      {
        name: "Славковые",
        latin_name: "Sylviidae",
        species_length: 32,
      },
      {
        name: "Иволговые",
        latin_name: "Oriolidae",
        species_length: 32,
      },
      {
        name: "Малюровые",
        latin_name: "Maluridae",
        alternative_names: ["Малюры", "Австралийские славки", "Австралийские крапивники"],
        species_length: 33,
      },
      {
        name: "Сорокопутовые",
        latin_name: "Laniidae",
        species_length: 34,
      },
      {
        name: "Суторовые",
        latin_name: "Paradoxornithidae",
        alternative_names: ["Толстоклювые синицы"],
        species_length: 38,
      },
      {
        name: "Ванговые",
        latin_name: "Vangidae",
        species_length: 40
      },
      {
        name: "Воробьиные",
        latin_name: "Passeridae",
        species_length: 43
      },
      {
        name: "Овсянковые",
        latin_name: "Emberizidae",
        species_length: 44
      },
      {
        name: "Райские птицы",
        latin_name: "Paradisaeidae",
        species_length: 45
      },
    ],
    min_species_length: 20,
    max_species_length: 49
  },
  // [50, 99)
  {
    families: [
      {
        name: "Австралийские зарянки",
        latin_name: "Petroicidae",
        species_length: 51
      },
      {
        name: "Цветоедовые",
        latin_name: "Dicaeidae",
        alternative_names: ["Цветососовые"],
        species_length: 57
      },
      {
        name: "Тимелиевые",
        latin_name: "Timaliidae",
        alternative_names: ["Кустарницы"],
        species_length: 58
      },
      {
        name: "Камышовковые",
        latin_name: "Acrocephalidae",
        alternative_names: ["Камышевковые"],
        species_length: 61
      },
      {
        name: "Виреоновые",
        latin_name: "Vireonidae",
        species_length: 62
      },
      {
        name: "Синицевые",
        latin_name: "Paridae",
        species_length: 63
      },
      {
        name: "Веерохвостковые",
        latin_name: "Rhipiduridae",
        alternative_names: ["Веерохвостки", "Веерохвостые мухоловки"],
        species_length: 65
      },
      {
        name: "Шипоклювковые",
        latin_name: "Acanthizidae",
        species_length: 65
      },
      {
        name: "Сверчковые",
        latin_name: "Locustellidae",
        species_length: 67
      },
      {
        name: "Свистуновые",
        latin_name: "Pachycephalidae",
        species_length: 69
      },
      {
        name: "Земляные тимелии",
        latin_name: "Pellorneidae",
        species_length: 70
      },
      {
        name: "Трясогузковые",
        latin_name: "Motacillidae",
        species_length: 70
      },
      {
        name: "Пеночки",
        latin_name: "Phylloscopus",
        alternative_names: ["Настоящие пеночки"],
        species_length: 81
      },
      {
        name: "Ласточки",
        latin_name: "Hirundo",
        alternative_names: ["Настоящие ласточки"],
        species_length: 92
      },
    ],
    min_species_length: 50,
    max_species_length: 99
  },
  // [100, 199)
  {
    families: [
      {
        name: "Жаворонковые",
        latin_name: "Alaudidae",
        species_length: 102
      },
      {
        name: "Монарховые",
        latin_name: "Monarchidae",
        alternative_names: ["Монархи"],
        species_length: 106
      },
      {
        name: "Трупиаловые",
        latin_name: "Icteridae",
        alternative_names: ["Американские иволги", "Кассики", "Желтушники"],
        species_length: 108
      },
      {
        name: "Личинкоедовые",
        latin_name: "Campephagidae",
        species_length: 109
      },
      {
        name: "Ткачиковые",
        latin_name: "Ploceidae",
        species_length: 122
      },
      {
        name: "Скворцовые",
        latin_name: "Sturnidae",
        species_length: 128
      },
      {
        name: "Кустарницевые",
        latin_name: "Leiothrichidae",
        alternative_names: ["Комичные тимелии"],
        species_length: 133
      },
      {
        name: "Врановые",
        latin_name: "Corvidae",
        alternative_names: ["Вороновые"],
        species_length: 139
      },
      {
        name: "Вьюрковые ткачики",
        latin_name: "Estrildidae",
        alternative_names: ["Астрильдовые"],
        species_length: 140
      },
      {
        name: "Белоглазковые",
        latin_name: "Zosteropidae",
        species_length: 152
      },
      {
        name: "Нектарницевые",
        latin_name: "Nectariniidae",
        species_length: 152
      },
      {
        name: "Бюльбюлевые",
        latin_name: "Pycnonotidae",
        alternative_names: ["Короткопалые дрозды"],
        species_length: 167
      },
      {
        name: "Цистиколовые",
        latin_name: "Cisticolidae",
        species_length: 168
      },
      {
        name: "Дроздовые",
        latin_name: "Turdidae",
        species_length: 191
      },
      {
        name: "Медососовые",
        latin_name: "Meliphagidae",
        species_length: 196
      },
    ],
    min_species_length: 100,
    max_species_length: 199
  },

  // [200, 299)
  {
    families: [
      {
        name: "Вьюрковые",
        latin_name: "Fringillidae",
        alternative_names: ["Настоящие вьюрковые"],
        species_length: 239
      }
    ],
    min_species_length: 200,
    max_species_length: 299
  },
  // 300+
  {
    families: [
      {
        name: "Танагровые",
        latin_name: "Thraupidae",
        species_length: 386
      },
      {
        name: "Мухоловковые",
        latin_name: "Muscicapidae",
        species_length: 357
      }
    ],
    min_species_length: 300,
  }
];
