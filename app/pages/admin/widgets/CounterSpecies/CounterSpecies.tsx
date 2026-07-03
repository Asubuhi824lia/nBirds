import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useState } from "react"

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

export const CounterSpecies = () => {
  // States
  const [count, setCount] = useState(0);

  const curGoal = 1; //
  const highestDigitStep = (count - curGoal) < 10
    ? 1
    : calcHighestDigitPlace(count, curGoal);


  return (
    <>
      <Stack spacing={2} sx={{ width: 200 }}>
        <Typography variant="h1" component="center">{count}</Typography>
        <ButtonGroup fullWidth size="large" color="primary">
          {/* <Button onClick={() => setCount(prev => prev - 1)}>-1</Button> */}
          <Button onClick={() => setCount(prev => prev + 1)}>+1</Button>
        </ButtonGroup>
      </Stack>
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