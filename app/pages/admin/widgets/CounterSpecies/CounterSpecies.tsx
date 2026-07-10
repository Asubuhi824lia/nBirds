import { Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react"
import { order } from "./utils/data/order/order";
import { NumCardList } from "./NumCardList/NumCardList";
import type { FamilyStruct } from "./utils/data/types";
import { AchieveCard } from "./AchieveCard/AchieveCard";
import { checkAchievements, isAchieveInRange, type AchieveCardType } from "./utils/data/achievements/checkAchievements";
import { achievements } from "./utils/data/achievements/data";

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


const speciesMAX = order.families[order.families.length - 1].species_length;
const edgePartNum = order.families_length / 2;

const groups =
  new Set(
    order.families
      .reduce((acc, value) => [...acc, value.species_length], [] as number[])
  )


export type ListType = {
  speciesNum: number;
  families: FamilyStruct[];
}

export const CounterSpecies = () => {
  const [count, setCount] = useState<number>(0);
  const achievedCountRef = useRef<number>(0); // MAX count value

  const [listRight, setListRight] = useState<ListType[]>([]);
  const [listLeft, setListLeft] = useState<ListType[]>([]);

  const [achieves, setAchieves] = useState<Array<AchieveCardType & { count: number }>>([]);
  const [isAchieveValue, setIsAchieveValue] = useState<number | false>(false);


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
    Array.from(groups).find((species) => species > count) || speciesMAX
  );


  function handleAddToList(newCount: number) {
    setCount(newCount);

    const familiesCalculated =
      order.families.filter(({ species_length }) => species_length === newCount);

    if (newCount > achievedCountRef.current) {
      achievedCountRef.current = newCount;

      // prevent extra additions
      if (familiesCalculated.length) {
        const isBilateral = achievedCountRef.current > edgePartNum;

        (!isBilateral ? setListLeft : setListRight)(
          prev => [{ speciesNum: newCount, families: familiesCalculated }, ...prev]
        );
      }
    }

    checkAchieve(newCount);
  }

  function checkAchieve(count: number) {
    const achieve = checkAchievements(count);
    if (achieve) {
      const curIndex = achieves.findIndex(({ title }) => title === achieve.title);
      setIsAchieveValue(curIndex === -1 ? achieves.length : curIndex);
      if (curIndex === -1)
        setAchieves(prev => [...prev, { ...achieve, count }]);
    }
    else {
      setIsAchieveValue(false);
    }
  }


  // START
  // Counter btns handlers
  const plusCountHandler = () => {
    const newCount = count + 1;
    handleAddToList(newCount);
  }

  const minusCountHandler = () => {
    const newCount = count - 1;
    setCount(newCount);
    checkAchieve(newCount);
  }

  const addStepCountHandler = () => {
    const newCount = count + stepPos;
    handleAddToList(newCount);
  }
  // END

  const turnToCount = (newCount: number) => {
    setCount(newCount);
    checkAchieve(newCount);
  }

  return (
    <>
      <NumCardList
        list={listLeft}
        curCount={count}
      />
      <Stack spacing={1} sx={{ alignItems: 'center', mx: 1, zIndex: 1 }}>
        <Paper elevation={5} sx={{ width: 200, p: 2, mx: 1.5, height: "fit-content" }}>
          <header>
            <Typography variant="body2" color="textSecondary">
              <p>Групп: {listLeft.length + listRight.length}</p>
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
              color={count <= 0 ? "textDisabled" : (count === speciesMAX ? "success" : (isAchieveValue !== false ? "secondary" : "textPrimary"))}
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
        {!!achieves.length && (
          <Paper elevation={5} sx={{ p: 2, mx: 1.5 }}>
            <Typography variant="caption">{achieves.length}/{Object.keys(achievements).length}</Typography>
            <Stack spacing={.5} direction="column-reverse">
              {achieves.map((achieve, index) => (
                <AchieveCard
                  key={`achieve-card-${index}`}
                  achieve={achieve}
                  isActive={isAchieveValue === index}
                  onClick={() => turnToCount(achieve.count)}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
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
  const stepPos = 10 ** (digitNum - 1);

  return {
    stepPos,
    isAchieveInRange: isAchieveInRange(curCount, curCount + stepPos)
  }
}