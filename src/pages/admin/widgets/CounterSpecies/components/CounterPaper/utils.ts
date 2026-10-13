import { getAchievementIndexes } from "../../utils/data/achievements/utils";
import type { OrderStruct } from "../../utils/data/types";

// 1 / 10 / 100 / 1000
export function calcHighestDigitPlace(curCount: number, goal: number, order: OrderStruct) {
  if (curCount > goal || goal <= 0 || curCount < 0) {
    throw new Error("Некорректное значение счётчика или искомого числа!");
  }

  const digitNum = new String(goal - curCount).length;
  const stepPos = 10 ** (digitNum - 1);

  return {
    stepPos,
    isAchieveInRange: isAchieveInRange(curCount, curCount + stepPos, order)
  }
}

function isAchieveInRange(startNum: number, endNum: number, order: OrderStruct) {
  const points = Object.values(getAchievementIndexes(order));
  return points.findIndex((value) => startNum < value && value < endNum) > -1;
}