import "../../../stories/config";

import React, { ReactElement } from "react";

import { Footer } from "./Footer";

export default {
  title: "UI Bootstrap/Components/Layout/Footer",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Footer },
};

export const BasicFooter = (): ReactElement => <Footer />;
