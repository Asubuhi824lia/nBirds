import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { BackHomeLink } from "@shared/ui/BackHomeLink";
import { builtinFillwordTopics } from "../data/topics";
import {
  loadCustomTopics,
  removeCustomTopic,
  saveCustomTopic,
} from "../model/customTopics";
import type { FillwordTopicJson } from "../model/types";
import "./fillword.css";

type CreatePuzzleProps = {
  onAddTopic: (topic: FillwordTopicJson) => void;
};

export function FillwordPage() {
  const [mode, setMode] = useState<"topics" | "create">("topics");
  const [customTopics, setCustomTopics] = useState(() => loadCustomTopics());
  const [Create, setCreate] = useState<ComponentType<CreatePuzzleProps> | null>(
    null,
  );
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  useEffect(() => {
    setCustomTopics(loadCustomTopics());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void import("./CreatePuzzle").then((mod) => {
      if (!cancelled) setCreate(() => mod.CreatePuzzle);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allTopics = useMemo(
    () => [...customTopics, ...builtinFillwordTopics],
    [customTopics],
  );

  const handleAddTopic = (topic: FillwordTopicJson) => {
    const next = saveCustomTopic(topic);
    setCustomTopics(next);
    setAddedNotice(`Тема «${topic.title}» добавлена в список.`);
    setMode("topics");
  };

  const handleRemoveCustom = (id: string) => {
    setCustomTopics(removeCustomTopic(id));
  };

  return (
    <section className="fillword-page">
      <BackHomeLink sx={{ mb: 1 }} />
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Филворд
        </Typography>
        <Typography color="text.secondary">
          Выберите тему или создайте свой набор слов.
        </Typography>
      </Stack>

      <div className="fillword-tabs">
        <Button
          variant={mode === "topics" ? "contained" : "outlined"}
          onClick={() => setMode("topics")}
        >
          Играть
        </Button>
        <Button
          variant={mode === "create" ? "contained" : "outlined"}
          onClick={() => setMode("create")}
        >
          Создать
        </Button>
      </div>

      {addedNotice && mode === "topics" && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {addedNotice}
        </Typography>
      )}

      {mode === "topics" && (
        <div className="fillword-topic-list">
          {allTopics.map((topic) => {
            const isCustom = customTopics.some((t) => t.id === topic.id);
            return (
              <div
                key={`${isCustom ? "c" : "b"}-${topic.id}`}
                className="fillword-topic-card"
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{
                    alignItems: { sm: "center" },
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", mb: 0.5 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {topic.title}
                      </Typography>
                      {isCustom && (
                        <Chip size="small" label="своя" color="success" />
                      )}
                    </Stack>
                    {topic.description && (
                      <Typography variant="body2" color="text.secondary">
                        {topic.description}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Слов: {topic.words.length} · сетка {topic.config.rows}×
                      {topic.config.cols}
                    </Typography>
                  </div>
                  <Stack direction="row" spacing={1}>
                    {isCustom && (
                      <Button
                        size="small"
                        color="inherit"
                        onClick={() => handleRemoveCustom(topic.id)}
                      >
                        Удалить
                      </Button>
                    )}
                    <Button
                      component={RouterLink}
                      to={`/fillword/${topic.id}`}
                      variant="contained"
                    >
                      Играть
                    </Button>
                  </Stack>
                </Stack>
              </div>
            );
          })}
        </div>
      )}

      {mode === "create" &&
        (Create ? (
          <Create onAddTopic={handleAddTopic} />
        ) : (
          <Stack sx={{ alignItems: "center", py: 6 }}>
            <CircularProgress size={28} />
          </Stack>
        ))}
    </section>
  );
}

export default FillwordPage;
