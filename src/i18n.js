import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { reactI18nextModule } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      //translation file path
      loadPath: "asset/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    debug: true, //disable in production
    ns: ["common", "home", "task"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      formatSeparator: ",", // not needed for react as it escapes by default
    },
    react: {
      wait: true,
    },
  });

export default i18n;
