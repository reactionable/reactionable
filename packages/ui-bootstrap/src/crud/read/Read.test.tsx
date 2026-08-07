import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./Read.stories";

const { BasicRead } = composeStories(stories);

describe("Read", () => {
	beforeAll(i18nTestInstance);

	describe("BasicRead", () => {
		it("should render without crashing", () => {
			const result = render(<BasicRead />);

			expect(result).toBeTruthy();
		});
	});
});
