import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { DailyMatchScore } from "@features/match-quiz/ui/DailyMatchScore";

const topics = [
  {
    to: "/match",
    title: "Сопоставление",
    description: "Выберите тему и сопоставьте признаки с ключевыми словами.",
  },
  {
    to: "/names",
    title: "Названия видов",
    description: "Обзор семейств и корней названий.",
  },
  {
    to: "/counter",
    title: "Счётчик видов",
    description: "Тренировка подсчёта по отряду.",
  },
] as const;

export function HomePage() {
  return (
    <section style={{ width: "min(720px, 100%)", padding: "24px 16px" }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            nBirds
          </Typography>
          <Typography color="text.secondary">
            Выберите тему или уровень
          </Typography>
          <DailyMatchScore />
        </Stack>

        <Stack spacing={2}>
          {topics.map((topic) => (
            <Card key={topic.to} variant="outlined">
              <CardActionArea component={RouterLink} to={topic.to}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {topic.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {topic.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Stack>
    </section>
  );
}

export default HomePage;
