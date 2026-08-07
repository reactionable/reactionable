import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./Delete.stories";

const { BasicDelete } = composeStories(stories);

describe("Delete", () => {
	beforeAll(i18nTestInstance);

	describe("BasicDelete", () => {
		it("should render without crashing", () => {
			const result = render(<BasicDelete />);

			expect(result).toBeTruthy();
		});
	});
});
