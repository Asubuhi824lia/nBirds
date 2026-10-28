/** Last week of October (25–31) through first week of November (1–7), local time. */
export function isHalloweenGarlandSeason(date: Date = new Date()): boolean {
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 9 && day >= 25) return true;
  if (month === 10 && day <= 7) return true;
  return false;
}
