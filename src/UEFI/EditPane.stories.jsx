import React from "react";
import { action } from "@storybook/addon-actions";
import { EditPaneView } from "./EditPane";
import { dxes } from "./EditPane.fixtures.js";

export default {
  title: "UEFI/EditPane",
  component: EditPaneView,
};

export const editPane = () => (
  <EditPaneView removals={dxes} remove={action("remove")} />
);
