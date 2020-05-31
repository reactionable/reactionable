module.exports = {
  stories: ['../packages/**/stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    // '@storybook/addon-docs',TODO: throws an error "Singleton client API not yet initialized, cannot call addParameters"
  ],
};
