import { createSlice } from "@reduxjs/toolkit";
import { getFVs } from "../util/utk";

const annotate = (u, a) => {
  return {
    ...u,
    fvs: u.fvs.map((fv) => ({
      ...fv,
      files: fv.files.map((f) =>
        f.guid === a.payload.guid
          ? {
              ...f,
              annotation: a.payload.annotation,
            }
          : f
      ),
    })),
  };
};

const uefiSlice = createSlice({
  name: "uefi",
  initialState: null,
  reducers: {
    init: (s, a) => (a.payload ? { fvs: getFVs(a.payload) } : null),
    clear: () => null,
    annotate,
  },
});

export const selectUefi = (store) => {
  return store.uefi;
};

export const selectAnnotation = (guid) => (store) => {
  let a = "";
  let found = false;
  store.uefi.fvs.forEach((fv) => {
    fv.files.forEach((f) => {
      if (f.guid === guid) {
        a = f.annotation || "";
        found = true;
        return;
      }
    });
    if (found) {
      return;
    }
  });
  return a;
};

export const uefiReducer = uefiSlice.reducer;
export const uefiActions = uefiSlice.actions;
