import { configureStore } from "@reduxjs/toolkit";
import { fmapReducer } from "./Flash/store";
import { uefiReducer } from "./UEFI/store";
import { amdReducer } from "./PSP/store";
import { cbfsReducer } from "./CBFS/store";
import { intelReducer } from "./Intel/store";

const store = configureStore({
  reducer: {
    fmap: fmapReducer,
    uefi: uefiReducer,
    amd: amdReducer,
    cbfs: cbfsReducer,
    intel: intelReducer,
  },
});

export default store;
