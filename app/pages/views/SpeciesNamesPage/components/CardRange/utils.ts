interface FindNameRootProps {
  nameSelected: string;
  name: string;
}
export function findNameRoot({
  nameSelected,
  name,
}: FindNameRootProps): string[] | null {
  // case unification
  nameSelected = nameSelected.toLowerCase();
  name = name.toLowerCase();


  // [...]
  if (!name.includes(nameSelected)) return null; // if (1 вхождение)
  // ["", ""]
  if (name === nameSelected) return [name];


  // get parts
  const sides = name.split(nameSelected);

  // start — 1st empty | ["", ...]
  if (!sides[0])
    sides[0] = ucFirst(nameSelected);
  // end — last empty | [..., ""]
  else if (!sides[1])
    sides[1] = nameSelected;
  // center | [..., ...]
  else {
    sides[2] = sides[1];
    sides[1] = nameSelected;
  }

  return [...sides]; //TODO: Why?
}

export function ucFirst(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}