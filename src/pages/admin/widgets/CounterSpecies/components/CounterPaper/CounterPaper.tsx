import { useMemo, useRef } from "react";
import { Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material"

import type { ListType, OrderStruct } from "../../utils/data/types"; 
import { calcHighestDigitPlace } from "./utils";


export enum ListSide { Left, Right }


interface CounterPaperProps {
  count: number;
  isAchieve: boolean;
  listLength: number;
  order: OrderStruct;
  addListItem: (isBilateral: ListSide) => React.Dispatch<React.SetStateAction<ListType[]>>;
  changeCountHandler: (newCount: number) => void;
}

export const CounterPaper = ({
  count,
  isAchieve,
  listLength,
  order,
  addListItem,
  changeCountHandler
}: CounterPaperProps) => {
  const achievedCountRef = useRef<number>(0); // MAX count value

  const speciesMAX = useMemo(() => order.families[order.families.length - 1].species_length, [order]);
  const edgePartNum = useMemo(() => order.families_length / 2, [order]);

  const groups = useMemo(
    () => new Set(
      order.families
        .reduce((acc, value) => [...acc, value.species_length], [] as number[])
    ),
    [order]
  )

  const goneFamiliesCalc =
    order.families
      .filter(({ species_length }) => species_length <= count).length;
  const goneSpeciesCalc =
    order.families
      .filter(({ species_length }) => species_length <= count)
      .reduce((acc, { species_length }) => acc + species_length, 0);

  const {
    stepPos,
    isAchieveInRange
  } = calcHighestDigitPlace(
    count,
    Array.from(groups).find((species) => species > count) || speciesMAX,
    order
  );


  const minusCountHandler = () => changeCountHandler(count - 1);

  const plusCountHandler = () => handleAddToList(count + 1);
  const addStepCountHandler = () => handleAddToList(count + stepPos);

  function handleAddToList(newCount: number) {
    changeCountHandler(newCount);

    const familiesCalculated =
      order.families.filter(({ species_length }) => species_length === newCount);

    if (newCount > achievedCountRef.current) {
      achievedCountRef.current = newCount;

      // prevent extra additions, lite variant
      if (familiesCalculated.length) {
        const isBilateral: ListSide = +(achievedCountRef.current > edgePartNum);
        const setList = addListItem(isBilateral);
        setList(
          prev => [{ speciesNum: newCount, families: familiesCalculated }, ...prev]
        );
      }
    }
  }


  return (
    <Paper elevation={5} sx={{ width: 200, p: 2, mx: 1.5, height: "fit-content" }}>
      <header>
        <Typography variant="body2" color="textSecondary">
          <p>Групп: {listLength}</p>
          <Typography variant="body2" color="textPrimary">
            <p>Семейств: {goneFamiliesCalc}</p>
            <p>Видов: {goneSpeciesCalc}</p>
          </Typography>
        </Typography>
      </header>
      <main>
        <Typography
          variant="h1"
          component="center"
          color={count <= 0 ? "textDisabled" : (count === speciesMAX ? "success" : (isAchieve ? "secondary" : "textPrimary"))}
        >{count}</Typography>
        <Stack>
          <ButtonGroup fullWidth size="large" color="primary">
            <Button onClick={minusCountHandler} disabled={count === 0}>-1</Button>
            <Button onClick={plusCountHandler} disabled={count === speciesMAX}>+1</Button>
          </ButtonGroup>
          {stepPos > 1 && (
            <Button fullWidth size="large" color={isAchieveInRange ? "secondary" : "primary"} variant="outlined" onClick={addStepCountHandler}>{stepPos}</Button>
          )}
        </Stack>
      </main>
      <footer>
        <fieldset>
          <Typography variant="caption" color="textSecondary">
            <p>MAX видов: {speciesMAX}</p>
            <p>Всего «семейств»: {order.families_length}</p>
            <p>Всего «видов»: {order.species_length}</p>
          </Typography>
        </fieldset>
      </footer>
    </Paper>
  )
}
