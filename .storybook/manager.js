import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming/create";

import logo from "./logo.svg";

addons.setConfig({
  showPanel: true,
  theme: {
    ...themes.light,
    brandTitle: "Reactionable storybook",
    brandUrl: "https://reactionable.github.io/reactionable/",
    brandImage: logo,
  },
});
