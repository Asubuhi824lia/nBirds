import type { FamiliesGroup } from "../types";
import { TenFamily, TwentyFamily } from "./submodules";

export const GroupFamilies20: Array<FamiliesGroup> = [
  {
    max_species_length: 20,
    min_species_length: 6,
    families: [
      ...TenFamily,
      ...TwentyFamily
    ]
  },
]