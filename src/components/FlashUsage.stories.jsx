import React from "react";
import FlashUsage from "./FlashUsage";
import usage from "./flashUsage.json";

export default {
  title: "FlashUsage",
  component: FlashUsage,
};

export const flashUsage = () => <FlashUsage usage={usage} />;
