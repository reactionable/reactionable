import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";

import { i18nTestInstance } from "../../../tests/I18n";
import { LanguageSelector } from "./LanguageSelector";
import { UIContextProvider, useUIProviderProps } from "../../UI";

export default {
  title: "Core/Components/UI/I18n/LanguageSelector",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: LanguageSelector,
  },
};

i18nTestInstance();

export const BasicLanguageSelector = (): ReactElement => {
  return (
    <UIContextProvider {...useUIProviderProps()}>
      <LanguageSelector onSelectLanguage={action("Language has changed")} />
    </UIContextProvider>
  );
};
