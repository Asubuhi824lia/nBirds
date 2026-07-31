import type { FamilyGroupStruct } from "../../../data/types";
import type { RootGroupType } from "../../../utils";
import { ucFirst } from "../utils";

interface ItemInfoMainProps {
  isSpecificValue: boolean;
  name: string;
  family: FamilyGroupStruct;
  nameParts: string[] | null;
  selectedNames: RootGroupType[];
}
export const ItemInfoMain = ({
  name,
  family: {
    species_length: length
  },
  isSpecificValue,
  nameParts,
  selectedNames,
}: ItemInfoMainProps) => (
  <p style={{ display: "flex", justifyContent: "space-between" }}>
    <span>
      {nameParts && nameParts.length > 1
        ? (nameParts.map((value, i) => (
          <span
            key={`name=part-${i}`}
            style={selectedNames.find(root => root.root.toLowerCase() === value.toLowerCase()) //TODO: сократить
              ? { backgroundColor: "pink" }
              : {}
            }
          >{i === 0 ? ucFirst(value) : value}</span>
        )))
        // TODO: а если "nameRoot" и "name" пересекаются?
        : name
      }
    </span>
    {(length >= 10 && !isSpecificValue) && (
      <span style={{ color: "GrayText" }}>&nbsp;{' — ' + length}</span>
    )}
  </p>
)