import { Divider, ListItem, ListItemText } from "@mui/material";
import type { FamilyGroupStruct } from "../../data/types";
import { ItemInfoAddition } from "./ItemInfo/ItemInfoAddition";
import { ItemInfoMain } from "./ItemInfo/ItemInfoMain";
import type { RootGroupType } from "../../utils";

interface ListGroupProps {
  familyId: number;
  family: FamilyGroupStruct;
  name: string;
  specPrimary: {
    isSpecificValue: boolean;
    selectedNames: RootGroupType[];
    nameParts: string[] | null;
  };
  specSecondary: {
    typeNameAlt: string;
    typeNameLatin: string;
  }
}
export const ListItemGroup = ({
  name,
  family,
  familyId,
  specPrimary,
  specSecondary,
}: ListGroupProps) => {
  return (
    <ListItem>
      {(familyId > 0) && (<Divider />)}
      <ListItemText
        sx={{
          width: "100%", cursor: "pointer", px: .8, borderRadius: 2,
          ":hover": { bgcolor: "antiquewhite" }
        }}
        primary={
          <ItemInfoMain
            name={name}
            family={family}
            {...specPrimary}
          />
        }
        secondary={
          <ItemInfoAddition
            name={name}
            family={family}
            {...specSecondary}
          />
        }
      />
    </ListItem>
  )
}