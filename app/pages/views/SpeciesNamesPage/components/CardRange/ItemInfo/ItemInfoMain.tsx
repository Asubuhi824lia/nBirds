import type { FamilyGroupStruct } from "../../../data/types";
import type { RootGroupType } from "../../../utils";
import { getOptionColor } from "../../SelectNamePart/utils";
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
    <TextPartsSelected
      name={name}
      nameParts={nameParts}
      getPartGroup={(value: string) => selectedNames.find(root => root.root.toLowerCase() === value.toLowerCase())}
    />
    {(length >= 10 && !isSpecificValue) && (
      <span style={{ color: "GrayText" }}>&nbsp;{' — ' + length}</span>
    )}
  </p>
)


interface TextPartsSelectedProps {
  name: string;
  nameParts?: string[] | null;
  getPartGroup: (value: string) => RootGroupType | undefined;
}
export const TextPartsSelected = ({
  name,
  nameParts,
  getPartGroup
}: TextPartsSelectedProps) => (
  <span>
    {nameParts && nameParts.length > 1
      ? (nameParts.map((value, i) => {
        const partGroup = getPartGroup(value);
        return (
          <span
            key={`name=part-${i}`}
            style={partGroup //TODO: сократить
              ? { backgroundColor: getOptionColor(partGroup.groupId) }
              : {}
            }
          >{i === 0 ? ucFirst(value) : value}</span>
        )
      }))
      // TODO: а если "nameRoot" и "name" пересекаются?
      : ucFirst(name)
    }
  </span>
)