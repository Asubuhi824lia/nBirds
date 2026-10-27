import type { FamilyGroupStruct } from "@shared/data/FamiliesGroups/types";
import type { RootGroupType } from "../../../../../utils";
import { getOptionColor } from "../../../../SelectNamePart/utils";
import Highlighter from "react-highlight-words";
import ucFirst from "./utils";

interface ItemInfoMainProps {
  isSpecificValue: boolean;
  name: string;
  family: FamilyGroupStruct;
  selectedNames: RootGroupType[];
}
export const ItemInfoMain = ({
  name,
  family: {
    species_length: length
  },
  isSpecificValue,
  selectedNames,
}: ItemInfoMainProps) => (
  <p style={{ display: "flex", justifyContent: "space-between" }}>
    <Highlighter
      searchWords={selectedNames.map(root => root.root)}
      textToHighlight={ucFirst(name.toLowerCase())}
      highlightTag={({ children, searchIndex }) => (
        <mark style={{ backgroundColor: getOptionColor(selectedNames[searchIndex].groupId), padding: '0 2px' }}>
          {children}
        </mark>
      )}
    />
    {/* TODO: isSpecificValue уместно? заменить. */}
    {(length >= 10 && !isSpecificValue) && (
      <span style={{ color: "GrayText" }}>&nbsp;{' — ' + length}</span>
    )}
  </p>
)
