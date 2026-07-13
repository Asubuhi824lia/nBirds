import type { FamiliesGroup } from "../types";
import {
  FiveFamily,
  FourFamilies,
  MonoFamilies,
  TripleFamilies,
  TwiceFamilies
} from "./submodules";

export const GroupFamilies5: Array<FamiliesGroup> = [
  {
    max_species_length: 5,
    min_species_length: 1,
    families: [
      ...MonoFamilies,
      ...TwiceFamilies,
      ...TripleFamilies,
      ...FourFamilies,
      ...FiveFamily
    ]
  },
]