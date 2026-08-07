import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import * as stories from "./App.stories";

const { AppWithProviders } = composeStories(stories);

describe("App", () => {
	beforeAll(i18nTestInstance);

	describe("AppWithProviders", () => {
		it("should render without crashing", () => {
			const result = render(<AppWithProviders />);

			expect(result).toBeTruthy();
		});
	});
});
