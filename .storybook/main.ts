import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../packages/*/src/**/*.mdx",
    "../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
  ],
  addons: [getAbsolutePath("@chromatic-com/storybook"), {
    name: getAbsolutePath("@storybook/addon-docs"),
    options: {
      mdxPluginOptions: {
        mdxCompileOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
  }],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: ["./public"],
};
export default config;
