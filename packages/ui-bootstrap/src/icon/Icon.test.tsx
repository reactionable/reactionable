import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./Icon.stories";

const { BasicIcon } = composeStories(stories);

describe("Icon", () => {
	beforeAll(i18nTestInstance);

	describe("BasicIcon", () => {
		it("should render without crashing", () => {
			const result = render(<BasicIcon />);

			expect(result).toBeTruthy();
		});
	});
});
