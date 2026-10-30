import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("../features/home/index.ts"),
  route("names", "../features/species-names/index.ts"),
  route("match", "../features/match-quiz/layout.ts", [
    index("../features/match-quiz/topics.ts"),
    route(":levelId", "../features/match-quiz/index.ts"),
  ]),
  route("counter", "../features/counter/index.ts"),
  route("add-bird", "../features/add-bird/index.ts"),
] satisfies RouteConfig;
