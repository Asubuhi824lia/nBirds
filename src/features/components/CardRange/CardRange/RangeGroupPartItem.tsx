import type { FamilyPartStruct, RootGroupType } from "@features/utils";
import { ListItemGroup } from "../ListItemGroup"
import { findNameRoot } from "../utils";
import { dash } from "../../SelectNamePart/data";

interface RangeGroupPartItemProps {
  // ВНУТРЯНКА
  family: FamilyPartStruct;
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
  family,

  groupId,
  partId,
  familyId,

  isSpecificValue,

  typeNameLatin,
  typeNameAlt,
  selectedNames,
}: RangeGroupPartItemProps) => {
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

  //поиск совпадений
  // TODO: дубль! вынести в функцию
  const selectedGroupsSorted = selectedNames
    ?.filter(({ root }) => name.includes(root))
    .sort((a, b) => family.name.indexOf(a.root) - name.indexOf(b.root));

  const nameParts =
    selectedGroupsSorted
      .map((nameSelected, id, groups) => {
        const indexStart =
          id === 0
            ? 0
            : name.indexOf(groups[id - 1].root) + groups[id - 1].root.length;
        const indesEnd =
          id === groups.length - 1
            ? undefined
            : name.indexOf(nameSelected.root) + nameSelected.root.length;

        const curSubstring = name.slice(indexStart, indesEnd).trim()

        return findNameRoot({ name: curSubstring, nameSelected })
      })
      .reduce((acc, names) => names ? [...(acc ?? []), ...names] : acc, []);

  return (
    <ListItemGroup
      key={`group-${groupId}-part-${partId}-family-${familyId}`}
      familyId={familyId}
      family={family}
      name={name}
      specPrimary={{
        isSpecificValue,
        selectedNames,
        nameParts
      }}
      specSecondary={{
        typeNameAlt,
        typeNameLatin
      }}
    />
  )
}