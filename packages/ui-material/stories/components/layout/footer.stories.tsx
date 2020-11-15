import React, { ReactElement } from "react";

import { Footer } from "../../../src/layout/footer/Footer";

export default {
  title: "UI Material/Components/Layout/Footer",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Footer },
};

export const SimpleFooter = (): ReactElement => <Footer />;
