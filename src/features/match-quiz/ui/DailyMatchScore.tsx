import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getDailyMatchScore } from "../model/dailyScore";

type DailyMatchScoreProps = {
  /** Compact line for home cards; default is a labeled chip. */
  variant?: "chip" | "inline";
};

export function DailyMatchScore({ variant = "chip" }: DailyMatchScoreProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(getDailyMatchScore());

    const onStorage = (e: StorageEvent) => {
      if (e.key === "nbirds.match.dailyScore") {
        setScore(getDailyMatchScore());
      }
    };
    const onFocus = () => setScore(getDailyMatchScore());
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (variant === "inline") {
    return (
      <Typography variant="body2" color="text.secondary">
        Баллы за сегодня:{" "}
        <strong style={{ color: "var(--mq-purple, #9b5de5)" }}>{score}</strong>
      </Typography>
    );
  }

  return (
    <div className="match-daily-score" aria-label="Баллы за сегодня">
      <span className="match-daily-score__label">Баллы за сегодня</span>
      <span className="match-daily-score__value">{score}</span>
    </div>
  );
}
