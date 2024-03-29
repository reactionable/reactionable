import i18n from "i18next";

import { initializeI18n } from "./I18n";

describe("I18n", () => {
  describe("initializeI18n", () => {
    it("should retrieve the initialized I18n instance", async () => {
      const i18nInstance = await initializeI18n();

      expect(i18nInstance).toMatchObject(i18n);
    });

    it("should set the fallbackLng with the first available built-in resource language", async () => {
      const i18nInstance = await initializeI18n();
      expect(i18nInstance.language).toEqual("en");
    });

    it("should set the supportedLngs with the available built-in resources languages", async () => {
      const i18nInstance = await initializeI18n();
      expect(i18nInstance.options.supportedLngs).toEqual(["en", "fr", "cimode"]);
    });

    it("should load the built-in resources translations", async () => {
      const i18nInstance = await initializeI18n();
      await i18nInstance.changeLanguage("fr");
      const translation = i18nInstance.t("Cancel");
      expect(translation).toEqual("Annuler");
    });

    it("should load the given resources translations", async () => {
      const overrideTranslation = "Annuler !";
      const i18nInstance = await initializeI18n({
        resources: { fr: { common: { Cancel: overrideTranslation } } },
      });

      await i18nInstance.changeLanguage("fr");
      const overridedTranslation = i18nInstance.t("Cancel");
      expect(overridedTranslation).toEqual(overrideTranslation);

      const unchangedTranslation = i18nInstance.t("Powered by");
      expect(unchangedTranslation).toEqual("Propulsé par");
    });

    it("should merge with new given translations", async () => {
      const newTranslation = "Nouveau";
      const i18nInstance = await initializeI18n({
        resources: { fr: { new: { New: newTranslation } } },
      });

      await i18nInstance.changeLanguage("fr");
      const overridedTranslation = i18nInstance.t("New", {
        ns: "new",
      });
      expect(overridedTranslation).toEqual(newTranslation);
    });
  });
});
