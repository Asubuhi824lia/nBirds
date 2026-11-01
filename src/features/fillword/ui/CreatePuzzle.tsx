import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { PlacedWord } from "word-search-puzzle-generator";
import {
  clampGridSide,
  createFillwordPuzzle,
  DEFAULT_GRID_CONFIG,
  longestWordLength,
  MAX_GRID_SIDE,
  MIN_GRID_SIDE,
  minGridSideForWords,
  resolveGridConfig,
} from "../model/generate";
import { parseWordsInput, slugifyTopicId } from "../model/normalize";
import { topicToJson } from "../model/customTopics";
import type { FillwordGridConfig, FillwordTopicJson } from "../model/types";
import { FillwordGrid } from "./FillwordGrid";

type CreatePuzzleProps = {
  onAddTopic: (topic: FillwordTopicJson) => void;
};

export function CreatePuzzle({ onAddTopic }: CreatePuzzleProps) {
  const [title, setTitle] = useState("Моя тема");
  const [description, setDescription] = useState("");
  const [wordsText, setWordsText] = useState(
    "СИНИЦА\nДРОЗД\nВОРОНА\nЛАСТОЧКА\nСКВОРЕЦ",
  );
  const [config, setConfig] = useState<FillwordGridConfig>({
    ...DEFAULT_GRID_CONFIG,
  });
  const [previewKey, setPreviewKey] = useState(0);
  const [previewGrid, setPreviewGrid] = useState<string[][] | null>(null);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => parseWordsInput(wordsText), [wordsText]);
  const longest = useMemo(() => longestWordLength(words), [words]);
  const minSide = useMemo(
    () => minGridSideForWords(words, Boolean(config.allowTurns)),
    [words, config.allowTurns],
  );
  const effectiveConfig = useMemo(
    () => resolveGridConfig(words, config),
    [words, config],
  );

  const rowsRaised = config.rows < effectiveConfig.rows;
  const colsRaised = config.cols < effectiveConfig.cols;
  const sizeRaised = rowsRaised || colsRaised;

  const topicDraft: FillwordTopicJson = useMemo(
    () => ({
      id: slugifyTopicId(title),
      title: title.trim() || "Без названия",
      description: description.trim() || undefined,
      words,
      config: effectiveConfig,
    }),
    [title, description, words, effectiveConfig],
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
              rows: clampGridSide(Number(e.target.value)),
            }))
          }
          helperText={
            rowsRaised
              ? `В превью: ${effectiveConfig.rows}`
              : `мин. ${minSide}`
          }
          slotProps={{
            htmlInput: { min: MIN_GRID_SIDE, max: MAX_GRID_SIDE },
          }}
        />
        <TextField
          label="Столбцы"
          type="number"
          size="small"
          value={config.cols}
          onChange={(e) =>
            setConfig((c) => ({
              ...c,
              cols: clampGridSide(Number(e.target.value)),
            }))
          }
          helperText={
            colsRaised
              ? `В превью: ${effectiveConfig.cols}`
              : `мин. ${minSide}`
          }
          slotProps={{
            htmlInput: { min: MIN_GRID_SIDE, max: MAX_GRID_SIDE },
          }}
        />
      </div>

      {words.length > 0 && sizeRaised && (
        <Alert severity="info">
          {config.allowTurns ? (
            <>Минимальный размер сетки генератора — {MIN_GRID_SIDE}×{MIN_GRID_SIDE}.</>
          ) : longest > MIN_GRID_SIDE ? (
            <>
              В режиме прямой линии сторона сетки не может быть меньше самого
              длинного слова («{words.find((w) => w.length === longest) ?? ""}»,{" "}
              {longest} букв).
            </>
          ) : (
            <>
              Минимальный размер сетки генератора — {MIN_GRID_SIDE}×
              {MIN_GRID_SIDE}.
            </>
          )}{" "}
          Для превью и JSON используется {effectiveConfig.rows}×
          {effectiveConfig.cols}.
        </Alert>
      )}

      {words.length > 0 && !sizeRaised && (
        <Typography className="fillword-muted" variant="body2">
          Размер сетки: от {minSide} до {MAX_GRID_SIDE}
          {config.allowTurns
            ? " (слова могут изгибаться, длина слова не ограничивает сторону)."
            : longest > MIN_GRID_SIDE
              ? ` (нижняя граница = длина самого длинного слова, ${longest}).`
              : ` (минимум генератора — ${MIN_GRID_SIDE}).`}
        </Typography>
      )}

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(config.allowTurns)}
              onChange={(e) =>
                setConfig((c) => ({ ...c, allowTurns: e.target.checked }))
              }
            />
          }
          label="Повороты в слове"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={config.allowReverse}
              disabled={Boolean(config.allowTurns)}
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

      {config.allowTurns && (
        <Alert severity="warning">
          Режим поворотов не входит в{" "}
          <code>word-search-puzzle-generator</code> (только прямые линии).
          Размещение и выбор слова идут по соседним клеткам нашей реализацией;
          формат <code>PlacedWord.path</code> тот же.
        </Alert>
      )}

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
          <FillwordGrid
            remountKey={previewKey}
            grid={previewGrid}
            placedWords={placedWords}
            allowTurns={Boolean(effectiveConfig.allowTurns)}
            allowDiagonal={effectiveConfig.allowDiagonal}
            onWordFound={(word) =>
              setPlacedWords((prev) =>
                prev.map((pw) =>
                  pw.word === word ? { ...pw, found: true } : pw,
                ),
              )
            }
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
