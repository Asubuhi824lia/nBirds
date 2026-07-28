import type { FamilyGroupStruct } from "../../../data/types";
import { ucFirst } from "../utils";

interface ItemInfoMainProps {
  isSpecificValue: boolean;
  name: string;
  family: FamilyGroupStruct;
  nameParts: string[] | null;
  selectedNames: string[];
}
export const ItemInfoMain = ({
  name,
  family,
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
            style={selectedNames.includes(value.toLocaleLowerCase())
              ? { backgroundColor: "pink" }
              : {}
            }
          >{i === 0 ? ucFirst(value) : value}</span>
        )))
        // TODO: а если "nameRoot" и "name" пересекаются?
        : name
      }
    </span>
    {(family.species_length >= 10 && !isSpecificValue) && (
      <span style={{ color: "GrayText" }}>&nbsp;{' — ' + family.species_length}</span>
    )}
  </p>
)