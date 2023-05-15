import { createSlice } from "@reduxjs/toolkit";

const intelSlice = createSlice({
  name: "intel",
  initialState: null,
  reducers: {
    init: (s, a) => a.payload
      ? {
          fit: a.payload || null,
        }
      : null,
    clear: () => null,
  },
});

export const selectIntel = (s) => s.intel;
export const selectIntelMeta = (s) => s.intel && s.intel.fit;

export const intelReducer = intelSlice.reducer;
export const intelActions = intelSlice.actions;
