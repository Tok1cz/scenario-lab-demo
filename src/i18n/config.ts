import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";
import enCustomizer from "./locales/en/customizer.json";
import enResults from "./locales/en/results.json";

import deCommon from "./locales/de/common.json";
import deLanding from "./locales/de/landing.json";
import deCustomizer from "./locales/de/customizer.json";
import deResults from "./locales/de/results.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      landing: enLanding,
      customizer: enCustomizer,
      results: enResults,
    },
    de: {
      common: deCommon,
      landing: deLanding,
      customizer: deCustomizer,
      results: deResults,
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
