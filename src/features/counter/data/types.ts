import type { FamilyStruct } from "@shared/lib/types";

export interface OrderStruct extends Omit<FamilyStruct, "genera"> {
  families: Array<FamilyStruct>;
  families_length: number;
}

export type ListType = {
  families: FamilyStruct[];
  speciesNum: number;
}