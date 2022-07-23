import { createSlice } from "@reduxjs/toolkit";

const cbfsSlice = createSlice({
  name: "cbfs",
  initialState: null,
  reducers: {
    init: (s, a) => a.payload,
    clear: () => null,
  },
});

export const selectCbfs = (s) => s.cbfs;

export const cbfsReducer = cbfsSlice.reducer;
export const cbfsActions = cbfsSlice.actions;
