import { Divider, ListItem, ListItemText } from "@mui/material";
import type { FamilyGroupStruct } from "@pages/views/SpeciesNamesPage/data/types";
import { ItemInfoAddition } from "./ItemInfoAddition";
import { ItemInfoMain } from "./ItemInfoMain";
import type { RootGroupType } from "../../../utils";

interface ListGroupProps {
  familyId: number;
  family: FamilyGroupStruct;
  name: string;
  specPrimary: {
    isSpecificValue: boolean;
    selectedNames: RootGroupType[];
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
  specPrimary,
  specSecondary,
}: ListGroupProps) => {
  // console.log(
  //   name,
  //   specPrimary.selectedNames
  // )
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