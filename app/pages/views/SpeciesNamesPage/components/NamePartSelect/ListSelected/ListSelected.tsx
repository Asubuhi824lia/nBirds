import { List } from "@mui/material";
import type { OptionType } from "../../../data/types";
import { ListItemSelected } from "./ListItemSelected";

type ItemType = OptionType & { count?: number }

interface ListSelectedProps {
  list: ItemType[];
  onChange: (value: number) => void;
}
export const ListSelected = ({ list, onChange }: ListSelectedProps) => {

  return (
    <List>
      {list.map(({ value, label, count }, index) => (
        <ListItemSelected
          key={`name-root-selected-item-${index}`}
          count={count}
          onClose={() => onChange(value)}
        >{label}</ListItemSelected>
      ))}
    </List>
  )
}