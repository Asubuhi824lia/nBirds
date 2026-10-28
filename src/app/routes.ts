import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("../pages/views/SpeciesNamesPage/index.ts"),
  route("counter", "../pages/admin/widgets/CounterSpecies/CounterSpecies.tsx"),
  route("add-bird", "../pages/admin/widgets/FormBirdAdd/FormBirdAdd.tsx"),
] satisfies RouteConfig;
