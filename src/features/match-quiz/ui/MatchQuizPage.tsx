import { useEffect, useState, type ComponentType } from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import confetti from "canvas-confetti";
import { Link as RouterLink, useParams } from "react-router";
import { getMatchLevel } from "../data/catalog";
import { addDailyMatchScore } from "../model/dailyScore";
import { useMatchQuiz } from "../model/useMatchQuiz";
import type {
  MatchBlockDef,
  MatchLevel,
  MatchOption,
  PlacedByBlock,
} from "../model/types";
import { QuizMenuModal } from "./QuizMenuModal";
import { SuccessModal } from "./SuccessModal";
import "./matchQuiz.css";

type MatchQuizBoardProps = {
  poolOptions: MatchOption[];
  blocks: MatchBlockDef[];
  placedByBlock: PlacedByBlock;
  optionsById: Map<string, MatchOption>;
  rejectFlashId: string | null;
  isQuestionDone: boolean;
  isComplete: boolean;
  onGoNext: () => void;
  onTryPlace: (optionId: string, blockId: string) => boolean;
};

function MatchQuizSession({ level }: { level: MatchLevel }) {
  const {
    question,
    totalQuestions,
    progressDone,
    score,
    poolOptions,
    placedByBlock,
    optionsById,
    isQuestionDone,
    isComplete,
    rejectFlashId,
    tryPlace,
    goNextQuestion,
    restart,
  } = useMatchQuiz(level);
  const [menuOpen, setMenuOpen] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [Board, setBoard] = useState<ComponentType<MatchQuizBoardProps> | null>(
    null,
  );

  // Load DnD only in the browser — hooks break Vite SSR.
  useEffect(() => {
    let cancelled = false;
    void import("./MatchQuizBoard").then((mod) => {
      if (!cancelled) setBoard(() => mod.MatchQuizBoard);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isQuestionDone || isComplete) return;
    const timer = window.setTimeout(() => goNextQuestion(), 450);
    return () => window.clearTimeout(timer);
  }, [isQuestionDone, isComplete, goNextQuestion]);

  useEffect(() => {
    if (!isComplete || celebrated) return;
    setCelebrated(true);
    addDailyMatchScore(score);
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.65 },
    });
    window.setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 100, origin: { x: 0 } });
      confetti({ particleCount: 80, angle: 120, spread: 100, origin: { x: 1 } });
    }, 250);
  }, [isComplete, celebrated, score]);

  const handleRestart = () => {
    setCelebrated(false);
    restart();
  };

  if (!question) {
    return null;
  }

  const progressPct =
    totalQuestions > 0 ? Math.round((progressDone / totalQuestions) * 100) : 0;

  return (
    <section className="match-quiz-page">
      <AppBar
        position="static"
        elevation={0}
        className="match-quiz-header"
        sx={{
          background: "var(--mq-header-bg)",
          color: "var(--mq-header-fg)",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(40, 28, 58, 0.22)",
        }}
      >
        <Toolbar sx={{ gap: 1, px: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant="h6"
            sx={{ flex: 1, fontWeight: 600, color: "var(--mq-header-fg)" }}
          >
            {level.title}
          </Typography>
          <IconButton
            edge="end"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen(true)}
            sx={{ color: "var(--mq-header-fg-muted)" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="match-quiz-meta">
        <Typography variant="h5" component="h1" className="match-quiz-prompt">
          {question.prompt}
        </Typography>

        <Stack sx={{ alignItems: "center", gap: 0.25 }}>
          <span className="match-quiz-score-label">Счёт</span>
          <span className="match-quiz-score">{score}</span>
        </Stack>

        <div className="match-quiz-progress-row" aria-label="Прогресс квиза">
          <div
            className="match-quiz-progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-valuenow={progressDone}
          >
            <span style={{ width: `${progressPct}%` }} />
          </div>
          <span className="match-quiz-progress-count">
            {progressDone} / {totalQuestions}
          </span>
        </div>
      </div>

      {Board ? (
        <Board
          poolOptions={poolOptions}
          blocks={question.blocks}
          placedByBlock={placedByBlock}
          optionsById={optionsById}
          rejectFlashId={rejectFlashId}
          isQuestionDone={isQuestionDone}
          isComplete={isComplete}
          onGoNext={goNextQuestion}
          onTryPlace={tryPlace}
        />
      ) : (
        <Stack sx={{ alignItems: "center", py: 8 }}>
          <CircularProgress size={28} />
        </Stack>
      )}

      <QuizMenuModal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onRestart={handleRestart}
      />
      <SuccessModal open={isComplete} score={score} />
    </section>
  );
}

export function MatchQuizPage() {
  const { levelId } = useParams();
  const level = levelId ? getMatchLevel(levelId) : undefined;

  if (!level) {
    return (
      <section className="match-quiz-page">
        <Stack spacing={2} className="match-quiz-meta" sx={{ alignItems: "flex-start" }}>
          <Typography variant="h5" component="h1">
            Тема не найдена
          </Typography>
          <Typography color="text.secondary">
            Выберите тему из списка сопоставлений.
          </Typography>
          <Button component={RouterLink} to="/match" variant="contained">
            К темам
          </Button>
        </Stack>
      </section>
    );
  }

  return <MatchQuizSession key={level.id} level={level} />;
}

export default MatchQuizPage;
