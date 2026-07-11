import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react"
import { NumCardList } from "./components/NumCardList/NumCardList";
import { checkAchievements } from "./utils/data/achievements/checkAchievements";
import { achievements } from "./utils/data/achievements/data";
import { CounterPaper } from "./components/CounterPaper/CounterPaper";
import { order } from "./utils/data/order/order";
import { AchieveCardList, type AchievesType } from "./components/AchieveCardList/AchieveCardList"; 
import type { ListType } from "./utils/data/types";

/** 
 * Доп.
 * 
 * Диаграмма «видов — семейств/родов/...»
 * Варианты группировки групп по общему значению
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


export const CounterSpecies = () => {
  const [count, setCount] = useState<number>(0);

  const [listLeft, setListLeft] = useState<ListType[]>([]);
  const [listRight, setListRight] = useState<ListType[]>([]);

  const [achieves, setAchieves] = useState<AchievesType[]>([]);

  const changeCountHandler = (newCount: number) => {
    setCount(newCount);
    // check achieve
    const achieve = checkAchievements(count, order);
    if (achieve && !achieves.some(({ title }) => title === achieve.title)) {
      setAchieves(prev => [...prev, { ...achieve, count }]);
    }
  }

  return (
    <section style={{ display: "flex", gap: 24, justifyContent: "center", flexDirection: "column" }}>
      <header style={{ display: "flex", justifyContent: "center", padding: 16, backgroundColor: "lightseagreen" }}>
        <Typography variant="h5" component="h1">Отряд: {order.name || order.latin_name}</Typography>
      </header>
      <main style={{ display: "flex", justifyContent: "center" }}>
        <NumCardList
          list={listLeft}
          curCount={count}
          changeCountHandler={setCount}
        />
        <Stack spacing={1} sx={{ alignItems: 'center', mx: 1, zIndex: 1, gap: 2 }}>
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
              <AchieveCardList
                achieves={achieves}
                count={count}
                changeCountHandler={changeCountHandler}
              />
            </Paper>
          )}
        </Stack>
        <NumCardList
          list={listRight}
          curCount={count}
          changeCountHandler={setCount}
        />
      </main>
    </section>
  )
}
