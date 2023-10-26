import { createSlice } from "@reduxjs/toolkit";
import { getMeta, transformAmdFw, transformRomulanDirs  } from "../util/amd";

const amdSlice = createSlice({
  name: "amd",
  initialState: null,
  reducers: {
    set: (s, a) =>
      a.payload
        ? {
            dirs: transformRomulanDirs(a.payload.dirs),
            meta: a.payload.meta,
          }
        : null,
    init: (s, a) =>
      a.payload
        ? {
            dirs: transformAmdFw(a.payload),
            meta: getMeta(a.payload),
          }
        : null,
    clear: () => null,
  },
});

export const selectAmd = (s) => s.amd;
export const selectAmdMeta = (s) => s.amd && s.amd.meta;

export const amdReducer = amdSlice.reducer;
export const amdActions = amdSlice.actions;
