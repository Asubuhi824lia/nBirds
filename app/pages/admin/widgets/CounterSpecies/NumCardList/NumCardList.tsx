import { Grid } from "@mui/material"
import type { ListType } from "../CounterSpecies";
import { NumCard } from "./NumCard";


interface NumCardListProps {
  list: ListType[];
  curCount: number;
}

export const NumCardList = ({ list, curCount }: NumCardListProps) => {

  return (
    <Grid container columns={3} spacing={1} sx={{ width: "500px", alignContent: "flex-start" }}>
      {list.map(({ speciesNum, families }, index) => (
        <NumCard
          key={`families-card-${index}`}
          curCount={curCount}
          speciesNum={speciesNum}
          families={families}
        />
      ))}
    </Grid>
  )
}