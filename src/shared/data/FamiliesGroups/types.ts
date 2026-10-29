import type { SpeciesStruct } from "@shared/lib/types";
import type { RootGroupType } from "@shared/lib/utils";

export interface FamilyGroupStruct extends SpeciesStruct {
  species_length: number;
  SelectedGroups?: RootGroupType[];
}

export interface FamiliesGroup {
  families_length?: number;
  families: Array<FamilyGroupStruct>;
  max_species_length?: number;
  min_species_length: number;
}

/** Family
 * _________________
 * *genera_length
 */