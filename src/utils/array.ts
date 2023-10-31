import { Chance } from "chance";

export function seededShuffle(array: unknown[], seed: number) {
  return new Chance(seed).shuffle(array);
}
