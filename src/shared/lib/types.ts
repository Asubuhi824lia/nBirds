export interface SpeciesStruct {
  name: string;
  latin_name: string;
  alternative_names?: Array<string>;
}

interface GeneraStruct extends SpeciesStruct {
  species: Array<SpeciesStruct>;
  species_length: number;
}

/**
 * Запрашивается в @pages
 */
export interface FamilyStruct extends Omit<GeneraStruct, "species"> {
  genera?: Array<GeneraStruct>;
  genera_length?: number;
}