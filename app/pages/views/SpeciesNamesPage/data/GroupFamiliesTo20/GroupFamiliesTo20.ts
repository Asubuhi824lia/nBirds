import type { FamiliesGroup } from "../types";
import { FiveToFamily, TenToFamily, TwentyToFamily } from "./submodules";

// to 20 [5, 20)
export const GroupFamiliesTo20: FamiliesGroup = {
  max_species_length: 19,
  min_species_length: 5,
  families: [
    ...FiveToFamily,
    ...TenToFamily,
    ...TwentyToFamily
  ]
}