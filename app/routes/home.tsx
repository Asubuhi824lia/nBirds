import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { FormBirdAdd } from "~/pages/admin/FormBirdAdd";

export function meta({ location }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return <Welcome />;
  return <FormBirdAdd />
}
