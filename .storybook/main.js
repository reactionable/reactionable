module.exports = {
  stories: [
    "../stories/*.stories.tsx",
    "../stories/*.stories.mdx",
    "../packages/**/*.stories.tsx",
    "../packages/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
  ],
};
