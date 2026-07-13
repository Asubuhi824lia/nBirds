export interface SpeciesStruct {
  name: string;
  latin_name: string;
  alternative_names?: Array<string>;
}

interface FamilyGroupStruct extends SpeciesStruct {
  species_length: number;
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