import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { WordSearchGrid, type PlacedWord } from "word-search-puzzle-generator";
import { createFillwordPuzzle } from "../model/generate";
import type { FillwordTopic } from "../model/types";

type PlayPuzzleProps = {
  topic: FillwordTopic;
  topicsHref?: string;
};

export function PlayPuzzle({ topic, topicsHref = "/fillword" }: PlayPuzzleProps) {
  const [seed, setSeed] = useState(0);

  const puzzle = useMemo(
    () => createFillwordPuzzle(topic.words, topic.config),
    [topic, seed],
  );

  const [placedWords, setPlacedWords] = useState<PlacedWord[]>(
    puzzle.placedWords,
  );

  useEffect(() => {
    setPlacedWords(puzzle.placedWords);
  }, [puzzle]);

  const foundCount = placedWords.filter((w) => w.found).length;
  const total = placedWords.length;
  const done = total > 0 && foundCount === total;

  const handleWordFound = useCallback((word: string) => {
    setPlacedWords((prev) =>
      prev.map((pw) => (pw.word === word ? { ...pw, found: true } : pw)),
    );
  }, []);

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <div>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {topic.title}
          </Typography>
          <Typography className="fillword-muted">
            Найдено: {foundCount} / {total}
            {done ? " — все слова найдены!" : ""}
          </Typography>
        </div>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to={topicsHref} variant="outlined">
            К темам
          </Button>
          <Button variant="contained" onClick={() => setSeed((s) => s + 1)}>
            Новая сетка
          </Button>
        </Stack>
      </Stack>

      <div className="fillword-play-layout">
        <div className="fillword-grid-wrap">
          <WordSearchGrid
            key={`${topic.id}-${seed}`}
            grid={puzzle.grid}
            placedWords={placedWords}
            onWordFound={handleWordFound}
            classNames={{
              container: "fillword-grid",
              grid: "fillword-grid",
              row: "fillword-row",
              cell: "fillword-cell",
              cellSelected: "fillword-cell-selected",
              cellFound: "fillword-cell-found",
            }}
          />
        </div>

        <aside className="fillword-words">
          <h3>Слова</h3>
          <ul>
            {placedWords.map((pw) => (
              <li key={pw.word} className={pw.found ? "is-found" : ""}>
                {pw.word}
              </li>
            ))}
          </ul>
          {placedWords.length < topic.words.length && (
            <Typography
              variant="caption"
              className="fillword-muted"
              sx={{ mt: 1, display: "block" }}
            >
              Часть слов не поместилась в сетку — увеличьте размер в теме.
            </Typography>
          )}
        </aside>
      </div>
    </Stack>
  );
}
