const STORAGE_KEY = "nbirds.match.dailyScore";

type DailyScoreRecord = {
  date: string;
  score: number;
};

function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function readRecord(): DailyScoreRecord {
  if (typeof window === "undefined") {
    return { date: localDateKey(), score: 0 };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: localDateKey(), score: 0 };
    const parsed = JSON.parse(raw) as DailyScoreRecord;
    if (parsed?.date !== localDateKey()) {
      return { date: localDateKey(), score: 0 };
    }
    return { date: parsed.date, score: Number(parsed.score) || 0 };
  } catch {
    return { date: localDateKey(), score: 0 };
  }
}

function writeRecord(record: DailyScoreRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** Points earned today in match-quiz (resets at local midnight). */
export function getDailyMatchScore(): number {
  return readRecord().score;
}

/** Add points to today's total; returns the new total. */
export function addDailyMatchScore(points: number): number {
  if (!points) return getDailyMatchScore();
  const next = {
    date: localDateKey(),
    score: getDailyMatchScore() + points,
  };
  writeRecord(next);
  return next.score;
}
