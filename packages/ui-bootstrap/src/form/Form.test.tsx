import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import {
  BasicForm,
  FormSubmitError,
  FormWithCheckbox,
  FormWithFileAndPreview,
  FormWithLabelledInput,
  FormWithSelect,
  FormWithTextArea,
} from "./Form.stories";

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
});
