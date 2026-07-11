interface SpeciesStruct {
  name: string;
  latin_name: string;
  alternative_names?: Array<string>;
}

interface GeneraStruct extends SpeciesStruct {
  species: Array<SpeciesStruct>;
  species_length: number;
}

export interface FamilyStruct extends Omit<GeneraStruct, "species"> {
  genera: Array<GeneraStruct>;
  genera_length: number;
}

export interface OrderStruct extends Omit<FamilyStruct, "genera"> {
  families: Array<FamilyStruct>;
  families_length: number;
}


export type ListType = {
  families: FamilyStruct[];
  speciesNum: number;
}