import { select, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { Header } from "./Header";

export default {
  title: "Core/Components/UI/Layout/Header",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const BasicHeader = (): ReactElement => {
  const variant = select("Variant", ["dark", "light", undefined], undefined);
  return (
    <Header
      brand="Test brand header"
      variant={variant}
      navItems={[{ href: "/sample", children: "Sample link" }]}
    />
  );
};
