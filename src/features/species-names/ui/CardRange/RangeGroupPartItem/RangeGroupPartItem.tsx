import type { RootGroupType } from "@shared/lib/utils";
import { dash } from "@shared/data";
import { ListItemInfo } from "./ItemInfo/ListItemInfo"
import { getFamiliesById_noApi } from "../../../model";

interface RangeGroupPartItemProps {
  // определяются из последовательности
  groupId: number;
  partId: number;
  familyId: number;

  isSpecificValue: boolean;
  // определяются пользователем
  typeNameLatin: string;
  typeNameAlt: string;
  selectedNames: RootGroupType[];
}

export const RangeGroupPartItem = ({
  groupId,
  partId,
  familyId,

  isSpecificValue,

  typeNameLatin,
  typeNameAlt,
  selectedNames,
}: RangeGroupPartItemProps) => {

  const family = getFamiliesById_noApi({ groupId, partId, familyId });

  const name = (
    typeNameLatin === "latin_names_only"
      ? family.latin_name || "???" // только латинское
      : (
        family.name // nameMain
        || (
          typeNameAlt === "alt_names_without"
            ? (typeNameLatin === "latin_names_with_every"
              ? dash
              : family.latin_name // либо главное, либо латинское
            )
            : (
              (typeNameAlt === "alt_names_with_only") && family?.alternative_names?.length
                ? family.alternative_names[0]
                : (
                  typeNameLatin === "latin_names_with_only"
                    ? family.latin_name
                    : dash
                )
            )
        )
      )
  ).toLowerCase();

  return (
    <ListItemInfo
      familyId={familyId}
      family={family}
      name={name}
      selectedNames={selectedNames}
      specPrimary={{
        isSpecificValue
      }}
      specSecondary={{
        typeNameAlt,
        typeNameLatin
      }}
    />
  )
}