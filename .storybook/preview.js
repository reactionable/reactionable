import { themes } from "@storybook/theming";

import logo from "./logo.svg";

export const parameters = {
  docs: {
    theme: {
      ...themes.light,
      brandTitle: "Reactionable storybook",
      brandUrl: "https://reactionable.github.io/reactionable/",
      brandImage: logo,
    },
  },
};
