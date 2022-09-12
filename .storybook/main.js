module.exports = {
  stories: [
    "../stories/*.stories.mdx",
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
  ],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  staticDirs: ["./public"],
  core: {
    disableTelemetry: true,
    builder: "webpack5",
  },
};
