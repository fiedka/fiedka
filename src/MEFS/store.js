import { createSlice } from "@reduxjs/toolkit";

const mefsSlice = createSlice({
  name: "mefs",
  initialState: null,
  reducers: {
    init: (s, a) => {
      return a.payload;
    },
    clear: () => null,
  },
});

export const selectMefs = (s) => s.mefs;

export const mefsReducer = mefsSlice.reducer;
export const mefsActions = mefsSlice.actions;
