import type { FamilyGroupStruct } from "../../../data/types";

interface ItemInfoAdditionProps {
  name: string;
  family: FamilyGroupStruct;
  typeNameLatin: string;
  typeNameAlt: string;
}
export const ItemInfoAddition = ({
  name,
  family,
  typeNameLatin,
  typeNameAlt
}: ItemInfoAdditionProps) => {
  const isLatinEvery = typeNameLatin === "latin_names_with_every";
  const isAltEvery = typeNameAlt === "alt_names_with_every";

  return (
    <span>
      {isLatinEvery && ((name !== family.latin_name) && `лат. ${family.latin_name || "???"}`)}
      {isAltEvery && (
        <>
          {family.alternative_names?.map((name, id) => (
            <p key={`alternative-name-${id}`}>{name}</p>
          ))}
        </>
      )}
    </span>
  )
}