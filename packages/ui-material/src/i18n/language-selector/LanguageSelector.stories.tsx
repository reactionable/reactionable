import { i18nTestInstance } from "@reactionable/core";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { UIContextProvider } from "../../UI";
import { LanguageSelector } from "./LanguageSelector";

const meta: Meta<typeof LanguageSelector> = {
  title: "UI Material/Components/I18n/LanguageSelector",
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
    <UIContextProvider>
      <LanguageSelector {...props} />
    </UIContextProvider>
  ),
};
