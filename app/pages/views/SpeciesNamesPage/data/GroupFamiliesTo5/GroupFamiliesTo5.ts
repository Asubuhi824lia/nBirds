import type { FamiliesGroup } from "../types";
import {
  FourFamilies,
  MonoFamilies,
  TripleFamilies,
  TwiceFamilies
} from "./submodules";

// to 5 [1, 5)
export const GroupFamiliesTo5: FamiliesGroup = {
  max_species_length: 4,
  min_species_length: 1,
  families: [
    ...MonoFamilies,
    ...TwiceFamilies,
    ...TripleFamilies,
    ...FourFamilies
  ]
}