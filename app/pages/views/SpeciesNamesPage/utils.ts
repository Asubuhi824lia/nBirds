import type { FamiliesGroup, FamilyGroupStruct } from "./data/types";

// Filter by Species Range
export function getGroupsByNum(
  group: FamiliesGroup,
  typeNameLatin: string
): [number, FamilyGroupStruct[]][] {
  const parts = new Map<number, FamilyGroupStruct[]>();

  // get groups
  group.families.map((family) => {
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

  const partsSorted: [number, FamilyGroupStruct[]][]
    = (Array.from(parts.entries())).sort((a, b) => a[0] - b[0]);

  return [...partsSorted];
}