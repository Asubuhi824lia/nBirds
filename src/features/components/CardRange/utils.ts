import type { RootGroupType } from "../../utils";

interface FindNameRootProps {
  nameSelected: RootGroupType;
  name: string;
}
export function findNameRoot({
  nameSelected,
  name,
}: FindNameRootProps): string[] | null {
  // case unification
  nameSelected.root = nameSelected.root.toLowerCase();
  name = name.toLowerCase();

  // [...]
  if (!name.includes(nameSelected.root)) return null; // if (1 вхождение)
  // ["", ""]
  if (name === nameSelected.root) return [name];

  return getParts({ name, nameSelected });
}

function getParts({
  nameSelected,
  name,
}: FindNameRootProps) {
  const sides = name.split(nameSelected.root);

  // start — 1st empty | ["", ...]
  if (!sides[0])
    sides[0] = ucFirst(nameSelected.root);
  // end — last empty | [..., ""]
  else if (!sides[1])
    sides[1] = nameSelected.root;
  // center | [..., ...]
  else {
    sides[2] = sides[1];
    sides[1] = nameSelected.root;
  }

  return [...sides];
}

export function ucFirst(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}