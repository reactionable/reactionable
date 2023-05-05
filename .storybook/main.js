module.exports = {
  stories: ["../stories/*.stories.mdx", "../packages/**/*.stories.mdx", "../packages/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-knobs", "@storybook/addon-storysource", "@storybook/addon-docs", "@storybook/addon-controls", "@storybook/addon-mdx-gfm"],
  staticDirs: ["./public"],
  core: {
    disableTelemetry: true
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true,
      strictMode: true
    }
  },
  docs: {
    autodocs: true
  }
};