import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { fireEvent, render } from "@testing-library/react";

import { TestWrapper } from "../tests/TestWrapper";
import { Confirmation } from "./Confirmation";
import { BasicConfirmationAction, UseConfirmation } from "./Confirmation.stories";

describe("Confirmation", () => {
  beforeAll(i18nTestInstance);

  describe("BasicConfirmationAction", () => {
    it("should render without crashing", () => {
      const result = render(<BasicConfirmationAction />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseConfirmation", () => {
    it("should render without crashing", () => {
      const result = render(<UseConfirmation />);

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
