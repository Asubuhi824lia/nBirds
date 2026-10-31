const MIN_LEN = 3;

/**
 * Maximal common substrings of length ≥ 3 (case-insensitive).
 * Shorter matches fully contained in a longer one are dropped.
 */
export function findCommonSubstrings(a: string, b: string): string[] {
  const aN = a.toLocaleLowerCase("ru-RU");
  const bN = b.toLocaleLowerCase("ru-RU");
  if (aN.length < MIN_LEN || bN.length < MIN_LEN) return [];

  const found = new Set<string>();

  for (let len = aN.length; len >= MIN_LEN; len--) {
    for (let i = 0; i <= aN.length - len; i++) {
      const sub = aN.slice(i, i + len);
      if (bN.includes(sub)) found.add(sub);
    }
  }

  const all = [...found];
  return all
    .filter((s) => !all.some((other) => other !== s && other.includes(s)))
    .sort((x, y) => y.length - x.length || x.localeCompare(y, "ru"));
}

const PALETTE = [
  "#9b5de5",
  "#f15bb5",
  "#00bbf9",
  "#00f5d4",
  "#fee440",
  "#ef476f",
  "#118ab2",
  "#06d6a0",
  "#ff9f1c",
  "#7b2cbf",
];

export function nextBlockColor(used: string[]): string {
  const free = PALETTE.find((c) => !used.includes(c));
  return free ?? PALETTE[used.length % PALETTE.length];
}
