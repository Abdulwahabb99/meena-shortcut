/**
 * i18n / Locale configuration
 * Supported locales: ar (Arabic), en (English)
 */

export const LOCALES = {
  AR: "ar",
  EN: "en",
};

export const LOCALE_SETTINGS = {
  [LOCALES.AR]: {
    code: "ar",
    label: "العربية",
    dir: "rtl",
  },
  [LOCALES.EN]: {
    code: "en",
    label: "English",
    dir: "ltr",
  },
};

export const DEFAULT_LOCALE = LOCALES.EN;

export const STORAGE_KEY = "meena-locale";
