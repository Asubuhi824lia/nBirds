import { getOptionColor } from "../../../SelectNamePart/utils";
import type { FamilyGroupStruct } from "@shared/data/FamiliesGroups/types";
import type { RootGroupType } from "@shared/lib/utils";
import Highlighter from "react-highlight-words";
import ucFirst from "./utils";

interface ItemInfoAdditionProps {
  name: string;
  family: FamilyGroupStruct;
  selectedNames: RootGroupType[];
  typeNameLatin: string;
  typeNameAlt: string;
}
export const ItemInfoAddition = ({
  name,
  family: {
    latin_name: nameLatin,
    alternative_names: nameAlternatives
  },
  selectedNames,
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
            <p key={`alternative-name-${id}`}>
              <Highlighter
                searchWords={selectedNames.map(root => root.root)}
                textToHighlight={ucFirst(name.toLowerCase())}
                highlightTag={({ children, searchIndex }) => (
                  <mark style={{ backgroundColor: getOptionColor(selectedNames[searchIndex].groupId), opacity: .6, padding: '0 2px' }}>
                    {children}
                  </mark>
                )}
              />
            </p>
          ))}
        </>
      )}
    </span>
  )
}