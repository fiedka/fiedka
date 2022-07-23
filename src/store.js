import { configureStore } from "@reduxjs/toolkit";
import { uefiReducer } from "./UEFI/store";
import { amdReducer } from "./PSP/store";
import { cbfsReducer } from "./CBFS/store";
import { fmapReducer } from "./Flash/store";

const store = configureStore({
  reducer: {
    uefi: uefiReducer,
    amd: amdReducer,
    cbfs: cbfsReducer,
    fmap: fmapReducer,
  },
});

export default store;
