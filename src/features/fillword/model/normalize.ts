/** Strip spaces/punctuation and uppercase for grid placement. */
export function normalizeWord(raw: string): string {
  return raw
    .trim()
    .replace(/[\s\-–—_.,;:!?'"«»()[\]{}]/g, "")
    .replace(/ё/gi, "е")
    .toLocaleUpperCase("ru-RU");
}

export function parseWordsInput(text: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const part of text.split(/[\n,;]+/)) {
    const word = normalizeWord(part);
    if (word.length < 2) continue;
    if (seen.has(word)) continue;
    seen.add(word);
    result.push(word);
  }
  return result;
}

const CYRILLIC = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function isCyrillicWord(word: string): boolean {
  return /[А-ЯЁа-яё]/.test(word);
}

export function fillBlankLetters(grid: string[][], words: string[]): string[][] {
  const useCyrillic = words.some(isCyrillicWord);
  const alphabet = useCyrillic ? CYRILLIC : LATIN;
  return grid.map((row) =>
    row.map((cell) => {
      if (cell) return cell;
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }),
  );
}

export function slugifyTopicId(title: string): string {
  const base = title
    .trim()
    .toLocaleLowerCase("ru-RU")
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || `topic-${Date.now()}`;
}
