/**
 * Last week of the year (25–31 Dec) through the end of Russian New Year holidays (1–8 Jan),
 * local time. Spans the year boundary.
 */
export function isNewYearGarlandSeason(date: Date = new Date()): boolean {
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 11 && day >= 25) return true;
  if (month === 0 && day <= 8) return true;
  return false;
}
