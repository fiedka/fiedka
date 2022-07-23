import { createSlice } from "@reduxjs/toolkit";

const fmapSlice = createSlice({
  name: "fmap",
  initialState: null,
  reducers: {
    init: (s, a) => a.payload,
    clear: () => null,
  },
});

export const selectFmap = (s) => s.fmap;

export const fmapReducer = fmapSlice.reducer;
export const fmapActions = fmapSlice.actions;
