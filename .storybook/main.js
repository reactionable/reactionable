module.exports = {
  stories: ['../packages/**/stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    // '@storybook/addon-docs',TODO: throws an error "Singleton client API not yet initialized, cannot call addParameters"
  ],
};
