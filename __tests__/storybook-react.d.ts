declare module "@storybook/react" {
	import type { ComponentType } from "react";

	export function composeStories(
		storiesImport: unknown,
	): Record<string, ComponentType<Record<string, unknown>>>;
}
