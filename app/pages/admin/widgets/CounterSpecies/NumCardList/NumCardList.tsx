import { Button, Grid } from "@mui/material"
import type { ListType } from "../CounterSpecies";
import { NumCard } from "./NumCard";
import { useState } from "react";


interface NumCardListProps {
  list: ListType[];
  curCount: number;
}

export const NumCardList = ({ list, curCount }: NumCardListProps) => {
  const [activeTabs, setActiveTabs] = useState<number[]>([]);

  const onExpandAll = () => setActiveTabs([...list.map((_, index) => index)])
  const onCollapseAll = () => setActiveTabs([]);

  const toggleTabActive = (index: number) =>
    setActiveTabs(
      prev => prev.includes(index)
        ? prev.filter(ind => ind !== index)
        : [...prev, index]
    )

  return (
    <div>
      <div
        style={{
          display: list.length ? "flex" : "none",
          justifyContent: list.at(-1)?.speciesNum === 1 ? "right" : "left"
        }}
      >
        <Button size="small" onClick={onCollapseAll} disabled={!activeTabs.length}>
          Collapse All
        </Button>
        <Button size="small" onClick={onExpandAll} disabled={activeTabs.length === list.length}>
          Expand All
        </Button>
      </div>
      <Grid container columns={2} spacing={1} sx={{ alignContent: "flex-start", width: (180 + 8) * 2 }}>
        {list.map(({ speciesNum, families }, index) => (
          <Grid key={`families-card-${index}`} size={1}>
            <NumCard
              isTabActive={activeTabs.includes(index)}
              toggleTabActive={() => toggleTabActive(index)}
              curCount={curCount}
              speciesNum={speciesNum}
              families={families}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}