import { createSlice } from "@reduxjs/toolkit";
import { getFVs } from "../util/utk";

const uefiSlice = createSlice({
  name: "uefi",
  initialState: null,
  reducers: {
    init: (s, a) => (a.payload ? { fvs: getFVs(a.payload) } : null),
    clear: () => null,
  },
});

export const selectUefi = (store) => {
  return store.uefi;
};

export const uefiReducer = uefiSlice.reducer;
export const uefiActions = uefiSlice.actions;
