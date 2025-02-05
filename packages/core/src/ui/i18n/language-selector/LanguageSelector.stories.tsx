import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { i18nTestInstance } from "../../../testing/I18n";
import { UIContextProvider, useUIProviderProps } from "../../UI";
import { LanguageSelector } from "./LanguageSelector";

const meta: Meta<typeof LanguageSelector> = {
  title: "Core/Components/UI/I18n/LanguageSelector",
  component: LanguageSelector,
};

export default meta;

type Story = StoryObj<typeof LanguageSelector>;

i18nTestInstance();

export const BasicLanguageSelector: Story = {
  args: {
    onSelectLanguage: action("Language has changed"),
  },
  render: (props) => (
    <UIContextProvider {...useUIProviderProps()}>
      <LanguageSelector {...props} />
    </UIContextProvider>
  ),
};
