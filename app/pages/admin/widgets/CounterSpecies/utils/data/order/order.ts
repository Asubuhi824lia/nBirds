import type { OrderStruct } from "../types";
import { families_high, families_low, families_middle_high, families_middle_low } from "./submodules";


const families = [
  ...families_high,
  ...families_middle_high,
  ...families_middle_low,
  ...families_low,
];

export const order: OrderStruct = {
  name: "Воробьинообразные",
  latin_name: "Passeriformes",
  species_length: families.reduce((acc, { species_length }) => acc + species_length, 0), // 3042
  genera_length: 0, // TODO
  families_length: families.length,
  families: [...families],
};


