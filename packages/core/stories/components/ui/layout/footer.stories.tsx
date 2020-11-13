import React, { ReactElement } from "react";

import { Footer } from "../../../../src/ui/layout/footer/Footer";

export default {
  title: "Core/Components/UI/Layout/Footer",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Footer },
};

export const SimpleFooter = (): ReactElement => <Footer />;
