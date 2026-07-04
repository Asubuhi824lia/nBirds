import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react"
import { order } from "./utils/data/order/order";
import { NumCardList } from "./NumCardList/NumCardList";
import type { FamilyStruct } from "./utils/data/types";
import { getCompletedFirstValues, getHalfFamilyIndex, getHalfSpeciesFamilyIndex, getHalfSpeciesLengthIndex } from "./utils/data/achievements/utils";

/** Шаг 1
 * 
 * temp
 * — state (useState)
 * — переменная, динамически зависящая от ф-ции (+Error)
 * БД — массив (json, interface)
 * 
 * условное отображение (if...else)
 * onClick
 * динамическое пополнение массива результатов (unshift) — ( Фоновый скрипт ?? )
 * замещение информации в однотипном узле (key)
 */

/** Шаг 2 — типы отображения след./финального результата — + меню выбора */

/** 
 * Диаграмма «видов — семейств/родов/...»
 * 
 * подсчёт по API — Сбор аналитики — (НЕ цифр, стиля мышления / настроя)
 * — В окончании/начале — «На чём за <этап> Вы акцентировались более всего?» 
 * — (ск-ть прохождения, предугадывание next step, запоминание total count для каждого step, обзор/ознакомление/припоминание, медитация на динамике интерфейса, эффект гадания)
 * 
 * Геймификация — Ачивки (при выборе Акцента ДО)
 * — «А Вы верны себе!» — акцент неизменен для каждого дня занятий (можно выбирать И другие) в течении месяца + частота >= 1 раз/2 дня
 * — «Сумбур, или Полёт Разнообразия» — не меньше 3/4 акценто в пределах каждого дня на протяжении 1 недели
 * — «Многогранность» — тренировка на каждый Акцент за 1 день — для первого дня
 */


const speciesMAX = order.families.at(-1)?.species_length;

// TODO: achivement points
const HALF_SPECIES_INDEX = getHalfSpeciesFamilyIndex(order);
const HALF_FAMILIES_INDEX = getHalfFamilyIndex(order);
const HALF_SPECIES_LENGTH_INDEX = getHalfSpeciesLengthIndex(order);

const {
  NUM_GROUPS,
  goneFirstFifty: edgePartNum,
  goneFirstTen,
  goneFirstHundren
} = getCompletedFirstValues(order);


export type ListType = {
  speciesNum: number;
  families: FamilyStruct[];
}

export const CounterSpecies = () => {
  const [count, setCount] = useState<number>(0);
  const achivedCountRef = useRef<number>(0); // MAX count value

  const [familiesGone, setFamiliesGone] = useState<number>(0);
  const [speciesGone, setSpeciesGone] = useState<number>(0);

  const [listRight, setListRight] = useState<ListType[]>([]);
  const [listLeft, setListLeft] = useState<ListType[]>([]);


  const addCountHandler = () => {
    const newCount = count + 1;
    setCount(newCount);

    const familiesCalculated =
      order.families.filter(({ species_length }) => species_length === newCount);


    if (newCount > achivedCountRef.current) {
      achivedCountRef.current++;

      // prevent extra additions
      if (familiesCalculated.length) {
        const isBilateral = achivedCountRef.current > edgePartNum;

        (!isBilateral ? setListLeft : setListRight)(
          prev => [{ speciesNum: newCount, families: familiesCalculated }, ...prev]
        );
      }
    }

    // Побочное
    setFamiliesGone(prev => prev + familiesCalculated.length);
    setSpeciesGone(prev =>
      familiesCalculated.reduce((acc, { species_length }) => acc + species_length, prev)
    );
  }

  // TODO: сделать как 2 отдельных списка
  return (
    <>
      <NumCardList
        list={listLeft}
        curCount={count}
      />
      <Paper elevation={5} sx={{ width: 200, p: 2, height: "fit-content" }}>
        <header>
          <Typography variant="caption">
            <p>Семейств: {familiesGone}</p>
            <p>Видов: {speciesGone}</p>
          </Typography>
        </header>
        <main>
          <Typography variant="h1" component="center">{count}</Typography>
          <ButtonGroup fullWidth size="large" color="primary">
            <Button onClick={() => setCount(prev => prev - 1)} disabled={count === 0}>-1</Button>
            <Button onClick={addCountHandler} disabled={count === speciesMAX}>+1</Button>
          </ButtonGroup>
        </main>
        <footer>
          <fieldset>
            <Typography variant="caption" color="textSecondary">
              <Typography variant="caption" component="caption">MAX</Typography>
              <p>Семейств: {order.families_length}</p>
              <p>Видов: {speciesMAX}</p>
            </Typography>
          </fieldset>
        </footer>
      </Paper>
      <NumCardList
        list={listRight}
        curCount={count}
      />
    </>
  )
}

// Рассчитать наибольший разряд до искомого значения
// 1 / 10 / 100 / 1000
function calcHighestDigitPlace(curCount: number, goal: number) {
  if (curCount > goal || goal <= 0 || curCount < 0) {
    throw new Error("Некорректное значение счётчика или искомого числа!");
  }

  const digitNum = new String(goal - curCount).length;
  return 10 ** (digitNum - 1);
}