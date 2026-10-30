import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { matchLevels } from "../data/catalog";
import { DailyMatchScore } from "./DailyMatchScore";
import "./matchQuiz.css";

export function MatchTopicsPage() {
  return (
    <section className="match-quiz-page match-topics-page">
      <Stack spacing={3}>
        <Stack spacing={1} className="match-quiz-meta" sx={{ alignItems: "flex-start" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Сопоставление
          </Typography>
          <Typography color="text.secondary">
            Выберите тему вопросов
          </Typography>
          <DailyMatchScore />
        </Stack>

        <Stack spacing={2}>
          {matchLevels.map((level) => (
            <Card
              key={level.id}
              variant="outlined"
              sx={{
                borderColor: "var(--mq-meta-border)",
                bgcolor: "var(--mq-options-body)",
              }}
            >
              <CardActionArea component={RouterLink} to={`/match/${level.id}`}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {level.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {level.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1.25, color: "var(--mq-purple-deep)" }}
                  >
                    Вопросов: {level.questions.length}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>

        <Typography
          component={RouterLink}
          to="/"
          variant="body2"
          sx={{ color: "var(--mq-purple-deep)", alignSelf: "flex-start" }}
        >
          ← На главную
        </Typography>
      </Stack>
    </section>
  );
}

export default MatchTopicsPage;
