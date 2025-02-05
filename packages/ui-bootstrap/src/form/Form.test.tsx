import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./Form.stories";

const {
  BasicForm,
  FormWithLabelledInput,
  FormWithTextArea,
  FormWithSelect,
  FormWithCheckbox,
  FormWithFileAndPreview,
  FormSubmitError,
  FormWithAppendTextInput,
} = composeStories(stories);

describe("Form", () => {
  beforeAll(i18nTestInstance);

  describe("BasicForm", () => {
    it("should render without crashing", () => {
      const result = render(<BasicForm />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithLabelledInput", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithLabelledInput />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithTextArea", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithTextArea />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithSelect", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithSelect />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithCheckbox", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithCheckbox />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithFileAndPreview", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithFileAndPreview />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormSubmitError", () => {
    it("should render without crashing", () => {
      const result = render(<FormSubmitError />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithAppendTextInput", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithAppendTextInput />);

      expect(result).toBeTruthy();
    });
  });
});
