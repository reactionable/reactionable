import { composeStories } from "@storybook/react";
import { render, fireEvent } from "@testing-library/react";

import { LanguageSelectorComponent } from "./LanguageSelector";
import { i18nTestInstance } from "../../../testing/I18n";
import * as stories from "./LanguageSelector.stories";

const { BasicLanguageSelector } = composeStories(stories);

describe("LanguageSelector", () => {
  beforeAll(i18nTestInstance);

  describe("LanguageSelectorComponent", () => {
    it("should render without crashing", () => {
      const result = render(
        <LanguageSelectorComponent current="en" languages={["en"]} onSelectLanguage={jest.fn()} />
      );
      expect(result).toBeTruthy();
    });

    it("should render with current language", async () => {
      const result = render(
        <LanguageSelectorComponent current="en" languages={["en"]} onSelectLanguage={jest.fn()} />
      );
      expect(result).toBeTruthy();

      const select = (await result.getByRole("combobox")) as HTMLSelectElement;
      expect(select.value).toEqual("en");
    });

    it("should handle language change", async () => {
      const onChange = jest.fn();

      const result = render(
        <LanguageSelectorComponent
          current="en"
          languages={["en", "fr"]}
          onSelectLanguage={onChange}
        />
      );
      expect(result).toBeTruthy();

      let select = (await result.getByRole("combobox")) as HTMLSelectElement;

      expect(select.value).toEqual("en");
      expect(onChange).not.toHaveBeenCalled();

      // Change current language
      fireEvent.change(select, { target: { value: "fr" } });
      select = (await result.getByRole("combobox")) as HTMLSelectElement;
      expect(onChange).toHaveBeenCalledWith("fr");
    });
  });

  describe("BasicLanguageSelector", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLanguageSelector />);
      expect(result).toBeTruthy();
    });
  });
});
