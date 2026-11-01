import { useEffect, useState, type ComponentType } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router";
import { getFillwordTopic } from "../data/topics";
import type { FillwordTopic } from "../model/types";
import "./fillword.css";

type PlayPuzzleProps = {
  topic: FillwordTopic;
  topicsHref?: string;
};

export function FillwordPlayPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState<FillwordTopic | null | undefined>(
    undefined,
  );
  const [Play, setPlay] = useState<ComponentType<PlayPuzzleProps> | null>(null);

  useEffect(() => {
    setTopic(topicId ? getFillwordTopic(topicId) ?? null : null);
  }, [topicId]);

  useEffect(() => {
    let cancelled = false;
    void import("./PlayPuzzle").then((mod) => {
      if (!cancelled) setPlay(() => mod.PlayPuzzle);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (topic === undefined || !Play) {
    return (
      <section className="fillword-page">
        <Stack sx={{ alignItems: "center", py: 8 }}>
          <CircularProgress size={28} />
        </Stack>
      </section>
    );
  }

  if (!topic) {
    return (
      <section className="fillword-page">
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Тема не найдена
          </Typography>
          <Typography color="text.secondary">
            Выберите тему из списка филвордов.
          </Typography>
          <Button component={RouterLink} to="/fillword" variant="contained">
            К темам
          </Button>
        </Stack>
      </section>
    );
  }

  return (
    <section className="fillword-page">
      <Play topic={topic} topicsHref="/fillword" />
    </section>
  );
}

export default FillwordPlayPage;
