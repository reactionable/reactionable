import type { Preview } from "@storybook/react-vite";
import theme from "./theme";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    docs: {
      theme,
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => {
        // 1: reactionable-home
        if (a.id.match(/^reactionable-home/)) {
          return -1;
        }
        if (b.id.match(/^reactionable-home/)) {
          return 1;
        }
        // 2 reactionable-*
        if (a.id.match(/^reactionable-/)) {
          return -1;
        }
        if (b.id.match(/^reactionable-/)) {
          return 1;
        }
        // 3: core-*
        if (a.id.match(/^core-/)) {
          return -1;
        }
        if (b.id.match(/^core-/)) {
          return 1;
        }
        return 0;
      },
    },
  },
};

export default preview;
