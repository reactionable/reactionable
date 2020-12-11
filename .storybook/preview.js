import { themes } from "@storybook/theming";

import logo from "./logo.svg";

export const parameters = {
  options: {
    storySort: (a, b) => {
      // 1: reactionable-home
      if (a[0].match(/^reactionable-home/)) {
        return -1;
      }
      if (b[0].match(/^reactionable-home/)) {
        return 1;
      }
      // 2 reactionable-*
      if (a[0].match(/^reactionable-/)) {
        return -1;
      }
      if (b[0].match(/^reactionable-/)) {
        return 1;
      }
      // 3: core-*
      if (a[0].match(/^core-/)) {
        return -1;
      }
      if (b[0].match(/^core-/)) {
        return 1;
      }
      return 0;
    },
  },
  docs: {
    theme: {
      ...themes.light,
      brandTitle: "Reactionable storybook",
      brandUrl: "https://reactionable.github.io/reactionable/",
      brandImage: logo,
    },
  },
};
