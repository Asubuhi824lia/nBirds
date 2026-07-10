import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react"
import { NumCardList } from "./NumCardList/NumCardList";
import type { FamilyStruct } from "./utils/data/types";
import { AchieveCard } from "./AchieveCard/AchieveCard";
import { checkAchievements, type AchieveCardType } from "./utils/data/achievements/checkAchievements";
import { achievements } from "./utils/data/achievements/data";
import { CounterPaper } from "./CounterPaper";
import { order } from "./utils/data/order/order";

/** 
 * Доп.
 * 
 * Диаграмма «видов — семейств/родов/...»
 */

/** 
 * Межповторное.
 * 
 * Меню выбора — семейства отряда ... || рода семейства ... || виды рода ...
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


export type ListType = {
  speciesNum: number;
  families: FamilyStruct[];
}

export const CounterSpecies = () => {
  const [count, setCount] = useState<number>(0);

  const [listLeft, setListLeft] = useState<ListType[]>([]);
  const [listRight, setListRight] = useState<ListType[]>([]);

  const [achieves, setAchieves] = useState<Array<AchieveCardType & { count: number }>>([]);

  const changeCountHandler = (newCount: number) => {
    setCount(newCount);
    // check achieve
    const achieve = checkAchievements(count, order);
    if (achieve && !achieves.some(({ title }) => title === achieve.title)) {
      setAchieves(prev => [...prev, { ...achieve, count }]);
    }
  }

  return (
    <>
      <NumCardList
        list={listLeft}
        curCount={count}
      />
      <Stack spacing={1} sx={{ alignItems: 'center', mx: 1, zIndex: 1 }}>
        <CounterPaper
          count={count}
          isAchieve={achieves.some((achieve) => achieve.count === count)}
          listLength={listLeft.length + listRight.length}
          order={order}
          addListItem={(isBilateral) => !isBilateral ? setListLeft : setListRight}
          changeCountHandler={changeCountHandler}
        />
        {!!achieves.length && (
          <Paper elevation={5} sx={{ p: 2, mx: 1.5 }}>
            <Typography variant="caption">{achieves.length}/{Object.keys(achievements).length}</Typography>
            <Stack spacing={.5} direction="column-reverse">
              {achieves.map((achieve, index) => (
                <AchieveCard
                  key={`achieve-card-${index}`}
                  achieve={achieve}
                  isActive={achieves.find(({ title }) => title === achieve.title)?.count === count}
                  onClick={() => changeCountHandler(achieve.count)}
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
