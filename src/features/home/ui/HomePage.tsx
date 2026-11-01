import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { DailyMatchScore } from "@features/match-quiz/ui/DailyMatchScore";

type TopicCard = {
  to: string;
  title: string;
  description: string;
};

const sections: { title: string; items: TopicCard[] }[] = [
  {
    title: "Справочники",
    items: [
      {
        to: "/names",
        title: "Названия видов",
        description: "Обзор семейств и корней названий.",
      },
    ],
  },
  {
    title: "Интерактивные справочники",
    items: [
      {
        to: "/counter",
        title: "Счётчик видов",
        description: "Тренировка подсчёта по отряду.",
      },
      {
        to: "/links",
        title: "Связи семейств",
        description: "Найдите общие подстроки в названиях семейств.",
      },
    ],
  },
  {
    title: "Игры",
    items: [
      {
        to: "/match",
        title: "Сопоставление",
        description: "Выберите тему и сопоставьте признаки с ключевыми словами.",
      },
      {
        to: "/fillword",
        title: "Филворд",
        description: "Сыграйте в поиск слов по теме или создайте свой набор.",
      },
    ],
  },
];

export function HomePage() {
  return (
    <section style={{ width: "min(720px, 100%)", padding: "24px 16px" }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            nBirds
          </Typography>
          <Typography color="text.secondary">
            Выберите раздел
          </Typography>
          <DailyMatchScore />
        </Stack>

        {sections.map((section) => (
          <Stack key={section.title} spacing={1.5}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "text.secondary",
              }}
            >
              {section.title}
            </Typography>
            <Stack spacing={1.5}>
              {section.items.map((topic) => (
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
        ))}
      </Stack>
    </section>
  );
}

export default HomePage;
