import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("../features/species-names/index.ts"),
  route("counter", "../features/counter/index.ts"),
  route("add-bird", "../features/add-bird/index.ts"),
] satisfies RouteConfig;
