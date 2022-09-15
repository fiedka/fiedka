import guids from "../guiddb/guids.json";
import { hexifyPadded } from "./hex";

export const hexifyBigE = (i, n) =>
  hexifyPadded(i, n)
    .match(/.{1,2}/g)
    .reverse()
    .join("");

export const hexifyGuidArray = (guids) => {
  const g1h = hexifyPadded(guids[0], 8);
  const g2h = hexifyPadded(guids[1], 4);
  const g3h = hexifyPadded(guids[2], 4);
  const g4 = guids.slice(3, 5);
  const g4h = g4.map((g) => hexifyPadded(g, 2)).join("");
  const g5 = guids.slice(5, 11);
  const g5h = g5.map((g) => hexifyPadded(g, 2)).join("");
  return `${g1h}-${g2h}-${g3h}-${g4h}-${g5h}`.toUpperCase();
};

export const efiGuids = Object.entries(guids).map((e) => ({
  guid: hexifyGuidArray(e[1]),
  name: e[0],
}));
