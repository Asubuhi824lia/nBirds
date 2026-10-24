import type { FamilyPartStruct } from "../../../../utils";
import type { FamiliesGroup, FamilyGroupStruct } from "@shared/data/FamiliesGroups/types";
import type { FamilyGroupPartsStruct, PartFamiliesStruct } from "./types";

export function getPartsByNum(groups: FamiliesGroup[]): FamilyGroupPartsStruct[] {
  return groups.map(({ families, ...other }) => ({
    ...other,
    familiesParts: getGroupPartsByNum(families)
  }))
}
export function getGroupPartsByNum(families: FamilyGroupStruct[]) {
  const parts = new Map<number, FamilyPartStruct[]>();

  // get groups
  families.map((family) => {
    const tempFamily = structuredClone(family); // не мутировать оригинал

    // divide to subgroups by N
    const N = family.species_length; //результат поля в temp не меняется
    const key = N < 10 ? N : (Math.floor(N / 10) * 10);
    if (parts.has(key))
      parts.set(key, [...parts.get(key) as FamilyPartStruct[], tempFamily])
    else
      parts.set(key, [tempFamily])
  })

  // sort groups
  parts.forEach((part, key) => {
    const partSorted = part.sort((a, b) => a.species_length - b.species_length);
    parts.set(key, partSorted);
  })


  const partsSorted: PartFamiliesStruct[]
    = (Array.from(parts.entries())).sort((a, b) => a[0] - b[0]);

  return partsSorted;
}