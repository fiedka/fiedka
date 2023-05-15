import React from "react";
import LeakedKey from "./LeakedKey";

export default {
  title: "Intel/LeakedKey",
  component: LeakedKey,
};

const leakedKey = "77304b5179d0924e";

export const leaked = () => <LeakedKey leakedKey={leakedKey} />;
