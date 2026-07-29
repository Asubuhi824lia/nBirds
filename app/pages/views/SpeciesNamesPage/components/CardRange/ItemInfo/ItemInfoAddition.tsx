import type { FamilyGroupStruct } from "../../../data/types";

interface ItemInfoAdditionProps {
  name: string;
  family: FamilyGroupStruct;
  typeNameLatin: string;
  typeNameAlt: string;
}
export const ItemInfoAddition = ({
  name,
  family: {
    latin_name: nameLatin,
    alternative_names: nameAlternatives
  },
  typeNameLatin,
  typeNameAlt
}: ItemInfoAdditionProps) => {
  const isLatinEvery = typeNameLatin === "latin_names_with_every";
  const isAltEvery = typeNameAlt === "alt_names_with_every";

  return (
    <span>
      {isLatinEvery && ((name !== nameLatin) && `лат. ${nameLatin || "???"}`)}
      {isAltEvery && (
        <>
          {nameAlternatives?.map((name, id) => (
            <p key={`alternative-name-${id}`}>{name}</p>
          ))}
        </>
      )}
    </span>
  )
}