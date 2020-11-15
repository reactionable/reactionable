import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement, useEffect } from "react";

import { Loader, useLoader } from "../../src/loader/Loader";

export default {
  title: "UI Material/Components/Loader",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Loader },
  decorators: [withKnobs],
};

export const SimpleLoader = (): ReactElement => {
  const overlay = boolean("Overlay", false);

  return <Loader overlay={overlay} />;
};

export const UseLoader = (): ReactElement => {
  const overlay = boolean("Overlay", false);
  const loading = boolean("Loading", true);
  const { loader, setLoading } = useLoader({ overlay });

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return loader;
};
