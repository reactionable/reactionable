import { create } from "@storybook/theming";

import logo from "./logo.svg";

export default create({
  base: "light",
  brandTarget: "_self",
  brandTitle: "Reactionable",
  brandUrl: "https://reactionable.github.io/reactionable/",
  brandImage: logo,
});
