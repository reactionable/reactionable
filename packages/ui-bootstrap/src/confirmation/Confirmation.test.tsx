import { i18nTestInstance } from "@reactionable/core";
import { fireEvent, render } from "@testing-library/react";
import { composeStories } from "@storybook/react";

import { TestWrapper } from "../testing/TestWrapper";
import { Confirmation } from "./Confirmation";
import * as stories from "./Confirmation.stories";

const { UseConfirmation, BasicConfirmationAction } = composeStories(stories);

describe("Confirmation", () => {
  beforeAll(i18nTestInstance);

  describe("UseConfirmation", () => {
    it("should render without crashing", () => {
      const result = render(<UseConfirmation />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicConfirmationAction", () => {
    it("should render without crashing", () => {
      const result = render(<BasicConfirmationAction />);

      expect(result).toBeTruthy();
    });
  });

  it("should confirm", async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <Confirmation title="test" callback={callback} />
      </TestWrapper>
    );

    fireEvent.click(getByText("OK"));

    expect(callback).toHaveBeenCalledWith(true);
  });

  it("should cancel", async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <Confirmation title="test" callback={callback} />
      </TestWrapper>
    );

    fireEvent.click(getByText("Cancel"));

    expect(callback).toHaveBeenCalledWith(false);
  });
});
