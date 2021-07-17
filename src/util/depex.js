// import guids from "../efiXplorer/guids/guids.json";

export const hexify = (i, n) => i.toString(16).padStart(n, "0");

export const hexifyBigE = (i, n) =>
  hexify(i, n)
    .match(/.{1,2}/g)
    .reverse()
    .join("");

export const hexifyGuidArray = (guids) => {
  const g1h = hexify(guids[0], 8);
  const g2h = hexify(guids[1], 4);
  const g3h = hexify(guids[2], 4);
  const g4 = guids.slice(3, 5);
  const g4h = g4.map((g) => hexify(g, 2)).join("");
  const g5 = guids.slice(5, 11);
  const g5h = g5.map((g) => hexify(g, 2)).join("");
  return `${g1h}-${g2h}-${g3h}-${g4h}-${g5h}`.toUpperCase();
};

export const efiGuids = [];
/*
export const efiGuids = Object.entries(guids).map((e) => ({
  guid: hexifyGuidArray(e[1]),
  name: e[0],
}));
*/
