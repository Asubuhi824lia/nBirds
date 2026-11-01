import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  WordSearchGrid,
  type GridConfig,
  type PlacedWord,
} from "word-search-puzzle-generator";
import {
  createFillwordPuzzle,
  DEFAULT_GRID_CONFIG,
} from "../model/generate";
import { parseWordsInput, slugifyTopicId } from "../model/normalize";
import { topicToJson } from "../model/customTopics";
import type { FillwordTopicJson } from "../model/types";

type CreatePuzzleProps = {
  onAddTopic: (topic: FillwordTopicJson) => void;
};

export function CreatePuzzle({ onAddTopic }: CreatePuzzleProps) {
  const [title, setTitle] = useState("Моя тема");
  const [description, setDescription] = useState("");
  const [wordsText, setWordsText] = useState(
    "СИНИЦА\nДРОЗД\nВОРОНА\nЛАСТОЧКА\nСКВОРЕЦ",
  );
  const [config, setConfig] = useState<GridConfig>({ ...DEFAULT_GRID_CONFIG });
  const [previewKey, setPreviewKey] = useState(0);
  const [previewGrid, setPreviewGrid] = useState<string[][] | null>(null);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => parseWordsInput(wordsText), [wordsText]);

  const topicDraft: FillwordTopicJson = useMemo(
    () => ({
      id: slugifyTopicId(title),
      title: title.trim() || "Без названия",
      description: description.trim() || undefined,
      words,
      config: {
        ...config,
        fillBlanks: false,
      },
    }),
    [title, description, words, config],
  );

  const jsonText = useMemo(() => topicToJson(topicDraft), [topicDraft]);

  const regenerate = () => {
    setError(null);
    setCopied(false);
    if (words.length < 1) {
      setError("Добавьте хотя бы одно слово.");
      setPreviewGrid(null);
      setPlacedWords([]);
      return;
    }
    const next = createFillwordPuzzle(words, config);
    setPreviewGrid(next.grid);
    setPlacedWords(next.placedWords);
    setPreviewKey((k) => k + 1);
  };

  const handleAdd = () => {
    setCopied(false);
    if (words.length < 1) {
      setError("Добавьте хотя бы одно слово.");
      return;
    }
    onAddTopic(topicDraft);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setError(null);
    } catch {
      setError("Не удалось скопировать — выделите JSON вручную.");
    }
  };

  return (
    <div className="fillword-create">
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Создать филворд
      </Typography>
      <Typography className="fillword-muted">
        Введите слова (по одному в строке или через запятую), настройте сетку и
        получите JSON темы. Его можно добавить в список для прохождения.
      </Typography>

      <TextField
        label="Название темы"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        size="small"
      />
      <TextField
        label="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        size="small"
      />
      <TextField
        label="Слова"
        value={wordsText}
        onChange={(e) => setWordsText(e.target.value)}
        fullWidth
        multiline
        minRows={5}
        helperText={`Распознано слов: ${words.length}`}
      />

      <div className="fillword-create__row">
        <TextField
          label="Строки"
          type="number"
          size="small"
          value={config.rows}
          onChange={(e) =>
            setConfig((c) => ({
              ...c,
              rows: Math.min(25, Math.max(5, Number(e.target.value) || 5)),
            }))
          }
          slotProps={{ htmlInput: { min: 5, max: 25 } }}
        />
        <TextField
          label="Столбцы"
          type="number"
          size="small"
          value={config.cols}
          onChange={(e) =>
            setConfig((c) => ({
              ...c,
              cols: Math.min(25, Math.max(5, Number(e.target.value) || 5)),
            }))
          }
          slotProps={{ htmlInput: { min: 5, max: 25 } }}
        />
      </div>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.allowReverse}
              onChange={(e) =>
                setConfig((c) => ({ ...c, allowReverse: e.target.checked }))
              }
            />
          }
          label="Обратный порядок"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={config.allowDiagonal}
              onChange={(e) =>
                setConfig((c) => ({ ...c, allowDiagonal: e.target.checked }))
              }
            />
          }
          label="Диагонали"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={config.allowOverlap}
              onChange={(e) =>
                setConfig((c) => ({ ...c, allowOverlap: e.target.checked }))
              }
            />
          }
          label="Пересечения букв"
        />
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" onClick={regenerate}>
          Сгенерировать превью
        </Button>
        <Button
          variant="outlined"
          onClick={handleAdd}
          disabled={words.length < 1}
        >
          Добавить в список тем
        </Button>
        <Button variant="outlined" onClick={handleCopy}>
          {copied ? "Скопировано" : "Копировать JSON"}
        </Button>
      </Stack>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {previewGrid && (
        <div className="fillword-grid-wrap">
          <WordSearchGrid
            key={previewKey}
            grid={previewGrid}
            placedWords={placedWords}
            onWordFound={(word) =>
              setPlacedWords((prev) =>
                prev.map((pw) =>
                  pw.word === word ? { ...pw, found: true } : pw,
                ),
              )
            }
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
      )}

      <div>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          JSON темы
        </Typography>
        <textarea
          className="fillword-json"
          readOnly
          value={jsonText}
          aria-label="JSON темы филворда"
        />
        <Typography className="fillword-muted" sx={{ mt: 1 }}>
          Можно вставить этот объект в{" "}
          <code>src/features/fillword/data/topics.ts</code> или добавить через
          кнопку выше (сохранится в localStorage).
        </Typography>
      </div>
    </div>
  );
}
