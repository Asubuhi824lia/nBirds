import type { FamiliesGroup, FamilyGroupStruct } from "./data/types";


type PartFamiliesStruct = [number, FamilyGroupStruct[]];

// Filter by Species Range
export function getGroupsByNumbAndType(
  families: FamilyGroupStruct[],
  typeNameLatin: string
): PartFamiliesStruct[] {
  const parts = new Map<number, FamilyGroupStruct[]>();

  // get groups
  families.map((family) => {
    const tempFamily = structuredClone(family); // не мутировать оригинал

    // ADD FILTER BY NAME TYPES
    switch (typeNameLatin) {
      case "latin_names_without":
        if (!family.name && !family.alternative_names?.length)
          return; // не добавлять в Map
        else break;
      case "latin_names_only":
        tempFamily.name = "";
        tempFamily.alternative_names = [];
        break;
    }

    // divide to subgroups by N
    const N = family.species_length; //результат поля в temp не меняется
    const key = N < 10 ? N : (Math.floor(N / 10) * 10);
    if (parts.has(key))
      parts.set(key, [...parts.get(key) as FamilyGroupStruct[], tempFamily])
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

  return [...partsSorted];
}


// TODO: есть ли способ именно заменить тип имеющегося поля?
export type FamilyGroupPartsStruct = Omit<FamiliesGroup, "families"> & {
  families: PartFamiliesStruct[];
}
export function getPartsByNum(groups: FamiliesGroup[]): FamilyGroupPartsStruct[] {
  return groups.map(({ families, ...other }) => ({
    ...other,
    families: getGroupPartsByNum(families)
  }))
}
export function getGroupPartsByNum(families: FamilyGroupStruct[]) {
  const parts = new Map<number, FamilyGroupStruct[]>();

  // get groups
  families.map((family) => {
    const tempFamily = structuredClone(family); // не мутировать оригинал

    // divide to subgroups by N
    const N = family.species_length; //результат поля в temp не меняется
    const key = N < 10 ? N : (Math.floor(N / 10) * 10);
    if (parts.has(key))
      parts.set(key, [...parts.get(key) as FamilyGroupStruct[], tempFamily])
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

  return [...partsSorted];
}