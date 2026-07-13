import type { FamilyStruct } from "~/pages/admin/widgets/CounterSpecies/utils/data/types"




export const FourFamilies: Array<FamilyStruct> = [
  // Corvida
  // 4 - Радужные птицы, Гуйи
  {
    name: "Радужные птицы",
    latin_name: "Pardalotidae",
    alternative_names: ["Пардалотидовые"],
    genera: [
      {
        name: "Радужные птицы",
        latin_name: "Pardalotus",
        species_length: 4,
        species: [
          {
            name: "Леопардовая радужная птица",
            latin_name: "Pardalotus punctatus",
            alternative_names: ["Леопардовый радужник", "Пятнистый пардалот"]
          },
          {
            name: "Тасманийская радужная птица",
            latin_name: "Pardalotus quadragintus",
            alternative_names: ["Тасманийский радужник"]
          },
          {
            name: "Краснобровая радужная птица",
            latin_name: "Pardalotus rubricatus",
          },
          {
            name: "Полосатая радужная птица",
            latin_name: "Pardalotus striatus",
            alternative_names: ["Желтопоясничная радужная птица"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 4,
  },
  {
    name: "Гуйи",
    latin_name: "Callaeidae",
    alternative_names: ["новозеландские скворцы", "серёжковые скворцы"],
    genera: [
      {
        name: "Кокако",
        latin_name: "Callaeas",
        alternative_names: ["новозеландские скворцы"],
        species_length: 2,
        species: [
          {
            name: "Северный кокако",
            latin_name: "Callaeas wilsoni",
          },
          {
            name: "Южный кокако",
            latin_name: "Callaeas cinereus",
          }
        ]
      },
      {
        name: "седлоспинные гуйи",
        latin_name: "Philesturnus",
        alternative_names: ["седлистый гуйи"],
        species_length: 2,
        species: [
          {
            name: "Седлоспинная гуйя",
            latin_name: "Philesturnus carunculatus",
            alternative_names: ["южный седлоспин", "гуйя-седлоспин", "Теке", "Тико"],
          },
          {
            name: "Североостровная седлистая гуйя",
            latin_name: "Philesturnus rufusater",
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 4,
  },

  // Passerida
  // 4 — Шелковистые свиристели, Багамские танагры, Phaenicophilidae, Бесхвостковые, Mitrospingidae, Йоровые, Хилиоты
  {
    name: "Шелковистые свиристели",
    latin_name: "Ptiliogonatidae",
    genera: [
      {
        name: "Чёрные свиристели",
        latin_name: "Phainopepla",
        species_length: 1,
        species: [{
          name: "Чёрный свиристель",
          latin_name: "Phainopepla nitens",
          alternative_names: ["чёрный шелковистый свиристель"],
        }]
      },
      {
        name: "Чёрно-жёлтые шелкохвостки",
        latin_name: "Phainoptila",
        species_length: 1,
        species: [{
          name: "Чёрно-жёлтая шелкохвостка",
          latin_name: "Phainoptila melanoxantha",
        }]
      },
      {
        name: "Шёлковые свиристели",
        latin_name: "Ptiliogonys",
        species_length: 2,
        species: [
          {
            name: "Длиннохвостый шёлковый свиристель",
            latin_name: "Ptiliogonys caudatus",
          },
          {
            name: "Серый шёлковый свиристель",
            latin_name: "Ptiliogonys cinereus",
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 4,
  },
  {
    name: "",
    latin_name: "Spindalidae",
    genera: [
      {
        name: "Багамские танагры",
        latin_name: "Spindalis",
        alternative_names: ["Зены"],
        species_length: 4,
        species: [
          {
            name: "Багамская танагра",
            latin_name: "Spindalis zena",
            alternative_names: ["Кубинская зена", "Полосатоголовая танагра"]
          },
          {
            name: "Ямайская зена",
            latin_name: "Spindalis nigricephala",
          },
          {
            name: "Пуэрториканская зена",
            latin_name: "Spindalis portoricensis",
          },
          {
            name: "Гаитянская зена",
            latin_name: "Spindalis dominicensis",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 4,
  },
  {
    name: "",
    latin_name: "Phaenicophilidae",
    genera: [
      {
        name: "Земляные певуны",
        latin_name: "Microligea",
        species_length: 1,
        species: [
          {
            name: "Земляной певун",
            latin_name: "Microligea palustris",
          },
        ]
      },
      {
        name: "Пальмовые танагры",
        latin_name: "Phaenicophilus",
        species_length: 2,
        species: [
          {
            name: "Черношапочная пальмовая танагра",
            latin_name: "Phaenicophilus palmarum",
          },
          {
            name: "Серошапочная пальмовая танагра",
            latin_name: "Phaenicophilus poliocephalus",
          },
        ]
      },
      {
        name: "Ксенолигии",
        latin_name: "Xenoligea",
        species_length: 1,
        species: [
          {
            name: "Белокрылая ксенолигия",
            latin_name: "Xenoligea montana",
          },
        ]
      },
    ],
    genera_length: 3,
    species_length: 4,
  },
  {
    name: "Бесхвостковые",
    latin_name: "Pnoepygidae",
    genera: [
      {
        name: "Бесхвостые тимелии",
        latin_name: "Pnoepyga",
        species_length: 4,
        species: [
          {
            name: "Большая бесхвостая тимелия",
            latin_name: "Pnoepyga albiventer",
            alternative_names: ["чешучатая бесхвостка"]
          },
          {
            name: "Тайваньская бесхвостая тимелия",
            latin_name: "Pnoepyga formosana",
            alternative_names: ["тайваньская бесхвостка"]
          },
          {
            name: "Пятнистая бесхвостая тимелия",
            latin_name: "Pnoepyga immaculata",
            alternative_names: ["бесхвостая тимелия", "гималайская бесхвостка"]
          },
          {
            name: "Малая бесхвостая тимелия",
            latin_name: "Pnoepyga pusilla",
            alternative_names: ["малая бесхвостка"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 4,
  },
  {
    name: "",
    latin_name: "Mitrospingidae",
    genera: [
      {
        name: "Тростниковые танагры",
        latin_name: "Mitrospingus",
        species_length: 2,
        species: [
          {
            name: "Темнолицая тростниковая танагра",
            latin_name: "Mitrospingus cassinii",
          },
          {
            name: "Оливковоспинная тростниковая танагра",
            latin_name: "Mitrospingus oleagineus",
          },
        ]
      },
      {
        name: "Зелёные ортогонисы",
        latin_name: "Orthogonys",
        species_length: 1,
        species: [{
          name: "Зелёный ортогонис",
          latin_name: "Orthogonys chloricterus",
        }]
      },
      {
        name: "Чёрно-пегие танагры",
        latin_name: "Lamprospiza",
        species_length: 1,
        species: [{
          name: "Чёрно-пегая танагра",
          latin_name: "Lamprospiza melanoleuca",
        }]
      }
    ],
    genera_length: 3,
    species_length: 4,
  },
  {
    name: "Йоровые",
    latin_name: "Aegithinidae",
    genera: [
      {
        name: "Йоры",
        latin_name: "Aegithina",
        species_length: 4,
        species: [
          {
            name: "Длинноклювая йора",
            latin_name: "Aegithina lafresnayei",
            alternative_names: ["Большая йора"]
          },
          {
            name: "Черношапочная йора",
            latin_name: "Aegithina nigrolutea",
          },
          {
            name: "Чернокрылая йора",
            latin_name: "Aegithina tiphia",
            alternative_names: ["Пестрокрылая йора"]
          },
          {
            name: "Зелёная йора",
            latin_name: "Aegithina viridissima",
            alternative_names: ["Изумрудная йора"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 4,
  },
  {
    name: "",
    latin_name: "Hyliotidae",
    genera: [
      {
        name: "Хилиоты",
        latin_name: "Hyliota",
        species_length: 4,
        species: [
          {
            name: "Южная хилиота",
            latin_name: "Hyliota australis",
          },
          {
            name: "Желтобрюхая хилиота",
            latin_name: "Hyliota flavigaster",
          },
          {
            name: "Eзамбарская хилиота",
            latin_name: "Hyliota usambara",
          },
          {
            name: "Фиолетовая хилиота",
            latin_name: "Hyliota violacea",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 4,
  },
]

export const TripleFamilies: Array<FamilyStruct> = [
  // Corvida
  // 3 - Чаучиллы, Oreoicidae, Мохуа, Щетинкоклювки, Cnemophilidae, Сителлы (Краснолицые поползни)
  {
    name: "Сителлы",
    latin_name: "Neosittidae",
    alternative_names: ["Краснолицые поползни"],
    genera: [
      {
        name: "Краснолицые поползни",
        latin_name: "Daphoenositta",
        species_length: 1,
        species: [
          {
            name: "Изменчивая сителла",
            latin_name: "Daphoenositta chrysoptera",
            alternative_names: ["Пестроспинный краснолицый поползень"]
          },
          {
            name: "Горная сителла",
            latin_name: "Daphoenositta papuensis",
            alternative_names: ["Папуанский краснолицый поползень"]
          },
          {
            name: "Краснолицый поползень",
            latin_name: "Daphoenositta miranda",
            alternative_names: ["Черный краснолицый поползень"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Cnemophilidae",
    genera: [
      {
        name: "Желтобрюхие райские птицы",
        latin_name: "Loboparadisea",
        species_length: 1,
        species: [
          {
            name: "Желтобрюхая райская птица",
            latin_name: "Loboparadisea sericea",
          },
        ]
      },
      {
        name: "Многохохлые райские птицы",
        latin_name: "Cnemophilus",
        species_length: 2,
        species: [
          {
            name: "Многохохлая райская птица",
            latin_name: "Cnemophilus macgregorii",
            alternative_names: ["Серпохо́хлая райская птица"]
          },
          {
            name: "Райская птица-лория",
            latin_name: "Cnemophilus loriae",
          },
        ]
      }
    ],
    genera_length: 2,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Dasyornithidae",
    genera: [
      {
        name: "Щетинкоклювки",
        latin_name: "Dasyornis",
        species_length: 3,
        species: [
          {
            name: "Буроголовая щетинкоклювка",
            latin_name: "Dasyornis brachypterus",
          },
          {
            name: "Рыжеголовая щетинкоклювка",
            latin_name: "Dasyornis broadbenti",
          },
          {
            name: "Длинноклювая щетинкоклювка",
            latin_name: "Dasyornis longirostris",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Mohouidae",
    genera: [
      {
        name: "Мохуа",
        latin_name: "Mohoua",
        species_length: 3,
        species: [
          {
            name: "Белоголовая мохуа",
            latin_name: "Mohoua albicilla",
            alternative_names: ["Белоголовая мого"]
          },
          {
            name: "Буроголовая мохуа",
            latin_name: "Mohoua novaeseelandiae",
            alternative_names: ["Пипипи", "Пипи"]
          },
          {
            name: "Желтоголовая мохуа",
            latin_name: "Mohoua ochrocephala",
            alternative_names: ["Мохуа"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Oreoicidae",
    genera: [
      {
        name: "",
        latin_name: "Aleadryas",
        species_length: 1,
        species: [
          {
            name: "Рыжезатылочный свистун",
            latin_name: "Aleadryas rufinucha",
          },
        ]
      },
      {
        name: "",
        latin_name: "Ornorectes",
        species_length: 1,
        species: [
          {
            name: "Хохлатая дроздовая мухоловка",
            latin_name: "Ornorectes cristatus",
          },
        ]
      },
      {
        name: "Австралийские птицы-колокольчики",
        latin_name: "Oreoica",
        species_length: 1,
        species: [
          {
            name: "Австралийская птица-колокольчик",
            latin_name: "Oreoica gutturalis",
          },
        ]
      }
    ],
    genera_length: 3,
    species_length: 3,
  },
  {
    name: "Флейтистовые",
    latin_name: "Orthonychidae",
    alternative_names: ["Чаучилловые"],
    genera: [
      {
        name: "Чаучиллы",
        latin_name: "Orthonyx",
        alternative_names: ["Острохвосты"],
        species_length: 3,
        species: [
          {
            name: "Папуанская чаучилла",
            latin_name: "Orthonyx novaeguineae",
            alternative_names: ["Новогвинейский острохвост"]
          },
          {
            name: "Иглохвостая чаучилла",
            latin_name: "Orthonyx temminckii",
            alternative_names: ["Австралийский острохвост"]
          },
          {
            name: "Черноголовая чаучилла",
            latin_name: "Orthonyx spaldingii",
            alternative_names: ["Чаучилла"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },

  // Passerida
  // 3 — Свиристели, Никаторы, Иреновые, Paramythiidae, Modulatricidae, Краснохохлые мухоловки
  {
    name: "Свиристелевые",
    latin_name: "Bombycillidae",
    genera: [
      {
        name: "Свиристели",
        latin_name: "Bombycilla",
        species_length: 3,
        species: [
          {
            name: "Свиристель",
            latin_name: "Bombycilla garrulus",
            alternative_names: ["Обыкновенный свиристель"]
          },
          {
            name: "Амурский свиристель",
            latin_name: "Bombycilla japonica",
            alternative_names: ["Японский свиристель"]
          },
          {
            name: "Американский свиристель",
            latin_name: "Bombycilla cedrorum",
            alternative_names: ["Кедровый свиристель"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Nicatoridae",
    genera: [
      {
        name: "Никаторы",
        latin_name: "Nicator",
        species_length: 3,
        species: [
          {
            name: "Серогорлый никатор",
            latin_name: "Nicator chloris",
          },
          {
            name: "Буроголовый никатор ",
            latin_name: "Nicator gulari",
          },
          {
            name: "Желтогорлый никатор",
            latin_name: "Nicator vireo",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
  {
    name: "Иреновые",
    latin_name: "Irenidae",
    genera: [
      {
        name: "Ирены",
        latin_name: "Irena",
        species_length: 3,
        species: [
          {
            name: "Голубая ирена",
            latin_name: "Irena puella",
            alternative_names: ["Сине-чёрная ирена"]
          },
          {
            name: "Кобальтовая ирена",
            latin_name: "Irena cyanogastra",
          },
          {
            name: "Палаванская ирена",
            latin_name: "Irena tweeddalii",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Paramythiidae",
    genera: [
      {
        name: "Синичьи фруктоеды",
        latin_name: "Oreocharis",
        species_length: 1,
        species: [{
          name: "Синичий фруктоед",
          latin_name: "Oreocharis arfaki",
        }]
      },
      {
        name: "Хохлатые парамитии",
        latin_name: "Paramythia",
        species_length: 2,
        species: [
          {
            name: "Хохлатая парамития",
            latin_name: "Paramythia montium",
          },
          {
            name: "Восточный хохлатый фруктоед",
            latin_name: "Paramythia olivacea",
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Modulatricidae",
    genera: [
      {
        name: "",
        latin_name: "Arcanator",
        species_length: 1,
        species: [{
          name: "Горный бурый бюльбюль",
          latin_name: "Arcanator orostruthus",
        }]
      },
      {
        name: "Бюльбюлевые дрозды",
        latin_name: "Modulatrix",
        species_length: 1,
        species: [{
          name: "Бюльбюлевый дрозд",
          latin_name: "Modulatrix stictigula",
        }]
      },
      {
        name: "",
        latin_name: "Kakamega",
        species_length: 1,
        species: [{
          name: "Серобрюхая мышиная тимелия",
          latin_name: "Kakamega poliothorax",
        }]
      }
    ],
    genera_length: 3,
    species_length: 3,
  },
  {
    name: "",
    latin_name: "Erythrocercidae",
    genera: [
      {
        name: "Краснохохлые мухоловки",
        latin_name: "Erythrocercus",
        species_length: 3,
        species: [
          {
            name: "Золотоспинная краснохохлая мухоловка",
            latin_name: "Erythrocercus holochlorus",
          },
          {
            name: "Краснохохлая мухоловка Ливингстона",
            latin_name: "Erythrocercus livingstonei",
          },
          {
            name: "Бурошапочная краснохохлая мухоловка",
            latin_name: "Erythrocercus mccallii",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 3,
  },
]

export const TwiceFamilies: Array<FamilyStruct> = [
  // Corvida
  // 2 - Сахарные медососы, Лодкоклювые мухоловки, Снегирёвые сойки, Кустарниковые птицы, Лирохвосты
  {
    name: "Сахарные медососы",
    latin_name: "Promeropidae",
    genera: [
      {
        name: "Сахарные медососы",
        latin_name: "Promerops",
        alternative_names: ["Cахарные птицы"],
        species_length: 2,
        species: [
          {
            name: "Родезийский сахарный медосос",
            latin_name: "Promerops gurneyi",
          },
          {
            name: "Капский сахарный медосос",
            latin_name: "Promerops cafer",
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "",
    latin_name: "Machaerirhynchidae",
    genera: [
      {
        name: "Лодкоклювые мухоловки",
        latin_name: "Machaerirhynchus",
        species_length: 2,
        species: [
          {
            name: "Желтогрудая лодкоклювая мухоловка",
            latin_name: "Machaerirhynchus flaviventer",
          },
          {
            name: "Чернопятнистая лодкоклювая мухоловка",
            latin_name: "Machaerirhynchus nigripectus",
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "Снегирёвые сойки",
    latin_name: "Corcoracidae",
    genera: [
      {
        name: "Снегирёвые сойки",
        latin_name: "Struthidea",
        species_length: 1,
        species: [
          {
            name: "Cнегирёвая сойка",
            latin_name: "Struthidea cinerea",
            alternative_names: ["Птица-апостол"]
          }
        ]
      },
      {
        name: "",
        latin_name: "Corcorax",
        species_length: 1,
        species: [
          {
            name: "Белокрылая галка",
            latin_name: "Corcorax melanorhamphos",
            alternative_names: ["Белокрылая клушица", "Белокрылый сорочий жаворонок"]
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 2,
  },
  {
    name: "Кустарниковые птицы",
    latin_name: "Atrichornithidae",
    genera: [
      {
        name: "Кустарниковые птицы",
        latin_name: "Atrichornis",
        alternative_names: ["Атрихии"],
        species_length: 2,
        species: [
          {
            name: "Рыжая кустарниковая птица",
            latin_name: "Atrichornis rufescens",
            alternative_names: ["Рыжая атрихия"]
          },
          {
            name: "Крикливая кустарниковая птица",
            latin_name: "Atrichornis clamosus",
            alternative_names: ["Крикливая атрихия"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "Лирохвосты",
    latin_name: "Menuridae",
    genera: [
      {
        name: "Лирохвосты",
        latin_name: "Menura",
        alternative_names: ["Птицы-лиры"],
        species_length: 2,
        species: [
          {
            name: "Большая птица-лира",
            latin_name: "Menura novaehollandiae",
            alternative_names: ["Обыкновенный лирохвост"]
          },
          {
            name: "Малая птица-лира",
            latin_name: "Menura alberti",
            alternative_names: ["Альбертов лирохвост", "Альбертов северный лирохвост"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  // Passerida
  // 2 — Скальные прыгуны, Буйволовые скворцы, Лысые вороны, Трясогузковые певуны, Корнихоны, Hyliidae
  {
    name: "",
    latin_name: "Chaetopidae",
    genera: [
      {
        name: "Скальные прыгуны",
        latin_name: "Chaetops",
        species_length: 2,
        species: [
          {
            name: "Рыжебрюхий прыгун",
            latin_name: "Chaetops aurantius",
            alternative_names: ["Драконовый прыгун"]
          },
          {
            name: "Скальный прыгун",
            latin_name: "Chaetops frenatus",
            alternative_names: ["Капский прыгун"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "",
    latin_name: "Buphagidae",
    genera: [
      {
        name: "Буйволовые скворцы",
        latin_name: "Buphagus",
        alternative_names: ["Волоклюи"],
        species_length: 2,
        species: [
          {
            name: "Желтоклювый буйволовый скворец",
            latin_name: "Buphagus africanus",
          },
          {
            name: "Красноклювый буйволовый скворец",
            latin_name: "Buphagus erythrorhynchus",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "",
    latin_name: "Picathartidae",
    genera: [
      {
        name: "Лысые вороны",
        latin_name: "Picathartes",
        alternative_names: ["Лысые сороки"],
        species_length: 2,
        species: [
          {
            name: "Восточная лысая ворона",
            latin_name: "Picathartes oreas",
            alternative_names: ["Серошейная лысая ворона"]
          },
          {
            name: "Западная лысая ворона",
            latin_name: "Picathartes gymnocephalus",
            alternative_names: ["Белошейная лысая ворона"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "",
    latin_name: "Teretistridae",
    genera: [
      {
        name: "Трясогузковые певуны",
        latin_name: "Teretistris",
        species_length: 2,
        species: [
          {
            name: "Восточный трясогузковый певун",
            latin_name: "Teretistris fornsi",
          },
          {
            name: "Желтоголовый трясогузковый певун",
            latin_name: "Teretistris fernandinae",
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "",
    latin_name: "Calyptophilidae",
    genera: [
      {
        name: "Корнихоны",
        latin_name: "Calyptophilus",
        species_length: 2,
        species: [
          {
            name: "Корнихон",
            latin_name: "Calyptophilus frugivorus",
            alternative_names: ["Танагровый певун", "Восточный корнихон"]
          },
          {
            name: "Западный корнихон",
            latin_name: "Calyptophilus tertius",
            alternative_names: ["Западный танагровый певун"]
          },
        ]
      }
    ],
    genera_length: 1,
    species_length: 2,
  },
  {
    name: "",
    latin_name: "Hyliidae",
    genera: [
      {
        name: "",
        latin_name: "Hylia",
        species_length: 1,
        species: [
          {
            name: "Хилия",
            latin_name: "Hylia prasina",
          },
        ]
      },
      {
        name: "Фолидорнисы",
        latin_name: "Pholidornis",
        species_length: 1,
        species: [
          {
            name: "Фолидорнис",
            latin_name: "Pholidornis rushiae",
          },
        ]
      }
    ],
    genera_length: 2,
    species_length: 2,
  },
]

export const MonoFamilies: Array<FamilyStruct> = [
  // Corvida
  // 1 - Волнистая толстоголовка, Серёжчатая толстоголовка, Хохлатая малайская сойка, Щетинкоголовый сорокопут, Новозеландский медосос (хИхи), Синеголовая ифрита
  {
    name: "",
    latin_name: "Notiomystidae",
    genera: [
      {
        name: "Новозеландские медососы",
        latin_name: "Notiomystis",
        species_length: 1,
        species: [{
          name: "Новозеландский медосос",
          latin_name: "Notiomystis cincta",
          alternative_names: ["Хихи"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "Калимантанские сорокопуты",
    latin_name: "Pityriasidae",
    genera_length: 1,
    genera: [
      {
        name: "Щетинковые сорокопуты",
        latin_name: "Pityriasis",
        species_length: 1,
        species: [{
          name: "Щетинковый сорокопут",
          latin_name: "Pityriasis gymnocephala",
          alternative_names: ["Щетинкоголовый сорокопут"]
        }]
      }
    ],
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Platylophidae",
    genera: [
      {
        name: "Хохлатые малайские сойки",
        latin_name: "Platylophus",
        species_length: 1,
        species: [{
          name: "Хохлатая малайская сойка",
          latin_name: "Platylophus galericulatus",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "Серёжчатая толстоголовка",
    latin_name: "Eulacestomatidae",
    genera: [
      {
        name: "Серёжчатые толстоголовки",
        latin_name: "Eulacestoma",
        species_length: 1,
        species: [{
          name: "Серёжчатая толстоголовка",
          latin_name: "Eulacestoma nigropectus",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Rhagologidae",
    genera: [
      {
        name: "Волнистые толстоголовки",
        latin_name: "Rhagologus",
        species_length: 1,
        species: [{
          name: "Волнистая толстоголовка",
          latin_name: "Rhagologus leucostigma",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Ifritidae",
    genera: [
      {
        name: "Ифриты",
        latin_name: "Ifrita",
        species_length: 1,
        species: [{
          name: "Синеголовая ифрита",
          latin_name: "Ifrita kowaldi",
          alternative_names: ["Синеша́почная ифрита"],
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  // Passerida
  // 1 — Иктерия, Стенолаз, Скотоцерка, Усатая_синица, Оливковый_певун, Пальмовый_чекан, Танагра-кео, 
  //      Флейтист-пастушок, Пуэрто-риканская_танагра, Пятнистый_крапивниковый_бабблер, Крапивниковый_дрозд, 
  //      Чечевица_Пржевальского, Сорокопутовый_свиристель, Целебесская_толстоголовка, Черноголовый_пересмешник
  {
    name: "Скотоцерковые",
    latin_name: "Scotocercidae",
    genera: [
      {
        name: "Скотоцерки",
        latin_name: "Scotocerca",
        species_length: 1,
        species: [{
          name: "Скотоцерка",
          latin_name: "Scotocerca inquieta",
          alternative_names: ["Вертлявая славка"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Tichodromidae",
    genera: [
      {
        name: "Стенолазы",
        latin_name: "Tichodroma",
        species_length: 1,
        species: [{
          name: "Стенола́з",
          latin_name: "Tichodroma muraria",
          alternative_names: ["Краснокры́лый стенола́з"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Icteriidae",
    genera: [
      {
        name: "Иктерии",
        latin_name: "Icteria",
        species_length: 1,
        species: [{
          name: "Иктерия",
          latin_name: "Icteria virens",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "Усатые синицы",
    latin_name: "Panuridae",
    genera: [
      {
        name: "Усатые синицы",
        latin_name: "Panurus",
        species_length: 1,
        species: [{
          name: "Усатая синица",
          latin_name: "Panurus biarmicus",
          alternative_names: ["Бородатка", "Тростниковая синица", "Камышовая синица", "Суторок"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "Оливковые певуны",
    latin_name: "Peucedramidae",
    genera: [
      {
        name: "",
        latin_name: "Peucedramus",
        species_length: 1,
        species: [{
          name: "Оливковый певун",
          latin_name: "Peucedramus taeniatus",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "Пальмовые чеканы",
    latin_name: "Dulidae",
    genera: [
      {
        name: "Пальмовые чеканы",
        latin_name: "Dulus",
        species_length: 1,
        species: [{
          name: "Пальмовый чекан",
          latin_name: "Dulus dominicus",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Rhodinocichlidae",
    genera: [
      {
        name: "Танагры-кео",
        latin_name: "Rhodinocichla",
        species_length: 1,
        species: [{
          name: "Танагра-кео",
          latin_name: "Rhodinocichla rosea",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Eupetidae",
    genera: [
      {
        name: "Флейтисты-пастушки",
        latin_name: "Eupetes",
        species_length: 1,
        species: [{
          name: "Флейтист-пастушок",
          latin_name: "Eupetes macrocerus",
          alternative_names: ["Пастушковый бегун"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Nesospingidae",
    genera: [
      {
        name: "Пуэрто-риканские танагры",
        latin_name: "Nesospingus",
        species_length: 1,
        species: [{
          name: "Пуэрто-риканская танагра",
          latin_name: "Nesospingus speculiferus",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Elachuridae",
    genera: [
      {
        name: "",
        latin_name: "Elachura",
        species_length: 1,
        species: [{
          name: "Пятнистый крапивниковый бабблер",
          latin_name: "Elachura formosa",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Zeledoniidae",
    genera: [
      {
        name: "Крапивниковые дрозды",
        latin_name: "Zeledonia",
        species_length: 1,
        species: [{
          name: "Крапивниковый дрозд",
          latin_name: "Zeledonia coronata",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Urocynchramidae",
    genera: [
      {
        name: "Чечевицы Пржевальского",
        latin_name: "Urocynchramus",
        species_length: 1,
        species: [{
          name: "Чечевица Пржевальского",
          latin_name: "Urocynchramus pylzowi",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "Сорокопутовые свиристели",
    latin_name: "Hypocoliidae",
    genera: [
      {
        name: "Сорокопутовые свиристели",
        latin_name: "Hypocolius",
        species_length: 1,
        species: [{
          name: "Сорокопутовый свиристель",
          latin_name: "Hypocolius ampelinus",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Hylocitreidae",
    genera: [
      {
        name: "Целебесские толстоголовки",
        latin_name: "Hylocitrea",
        species_length: 1,
        species: [{
          name: "Целебесская толстоголовка",
          latin_name: "Hylocitrea bonensis",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
  {
    name: "",
    latin_name: "Donacobiidae",
    genera: [
      {
        name: "Черноголовые пересмешники",
        latin_name: "Donacobius",
        species_length: 1,
        species: [{
          name: "Черноголовый пересмешник",
          latin_name: "Donacobius atricapilla",
        }]
      }
    ],
    genera_length: 1,
    species_length: 1,
  },
]