import { Divider, ListItem, ListItemText } from "@mui/material";
import type { FamilyGroupStruct } from "@shared/data/FamiliesGroups/types";
import { ItemInfoAddition } from "./ItemInfoAddition";
import { ItemInfoMain } from "./ItemInfoMain";
import type { RootGroupType } from "@shared/lib/utils";

interface ListGroupProps {
  familyId: number;
  family: FamilyGroupStruct;
  name: string;
  selectedNames: RootGroupType[];
  specPrimary: {
    isSpecificValue: boolean;
  };
  specSecondary: {
    typeNameAlt: string;
    typeNameLatin: string;
  }
}
export const ListItemInfo = ({
  name,
  family,
  familyId,
  selectedNames,
  specPrimary,
  specSecondary,
}: ListGroupProps) => {
  return (
    <ListItem>
      {/* ToDO: ? */}
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
            selectedNames={selectedNames}
            {...specPrimary}
          />
        }
        secondary={
          <ItemInfoAddition
            name={name}
            family={family}
            selectedNames={selectedNames}
            {...specSecondary}
          />
        }
      />
    </ListItem>
  )
}