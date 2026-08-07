import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@reactionable/amplify": resolve(
				import.meta.dirname,
				"packages/amplify/src/index.ts",
			),
			"@reactionable/core": resolve(
				import.meta.dirname,
				"packages/core/src/index.ts",
			),
			"@reactionable/graphql": resolve(
				import.meta.dirname,
				"packages/graphql/src/index.ts",
			),
			"@reactionable/nextjs": resolve(
				import.meta.dirname,
				"packages/nextjs/src/index.ts",
			),
			"@reactionable/react-router": resolve(
				import.meta.dirname,
				"packages/react-router/src/index.ts",
			),
			"@reactionable/ui-bootstrap": resolve(
				import.meta.dirname,
				"packages/ui-bootstrap/src/index.ts",
			),
			"@reactionable/ui-material": resolve(
				import.meta.dirname,
				"packages/ui-material/src/index.ts",
			),
			"apollo-upload-client/UploadHttpLink.mjs": resolve(
				import.meta.dirname,
				"packages/graphql/test-mocks/UploadHttpLink.mock.ts",
			),
		},
	},
	test: {
		coverage: {
			include: ["packages/*/src/**/*.{ts,tsx,js,jsx}"],
			provider: "v8",
		},
		environment: "jsdom",
		globals: true,
		setupFiles: [resolve(import.meta.dirname, "vitest.setup.ts")],
	},
});
