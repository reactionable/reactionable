import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./ListTable.stories";

const { BasicListTable } = composeStories(stories);

describe("ListTable", () => {
	beforeAll(i18nTestInstance);

	describe("BasicListTable", () => {
		it("should render without crashing", () => {
			const result = render(<BasicListTable />);

			expect(result).toBeTruthy();
		});
	});
});
