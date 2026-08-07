import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./List.stories";

const { BasicList } = composeStories(stories);

describe("List", () => {
	beforeAll(i18nTestInstance);

	describe("BasicList", () => {
		it("should render without crashing", () => {
			const result = render(<BasicList />);

			expect(result).toBeTruthy();
		});
	});
});
