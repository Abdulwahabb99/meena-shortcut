import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { LOCALE_SETTINGS, LOCALES, STORAGE_KEY } from "i18n/config";

/**
 * Hook to get current locale, RTL state, and available languages
 * Use isRTL for direction (document.body.dir, MUI theme direction)
 */
export default function useLocales() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  const currentLang = useMemo(() => {
    return LOCALE_SETTINGS[locale] || LOCALE_SETTINGS[LOCALES.EN];
  }, [locale]);

  const isRTL = currentLang?.dir === "rtl";

  const allLangs = useMemo(
    () => [
      { code: LOCALES.EN, label: LOCALE_SETTINGS[LOCALES.EN].label, dir: "ltr" },
      { code: LOCALES.AR, label: LOCALE_SETTINGS[LOCALES.AR].label, dir: "rtl" },
    ],
    []
  );

  const changeLocale = (newLocale) => {
    i18n.changeLanguage(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  };

  return {
    allLangs,
    currentLang,
    isRTL,
    locale,
    changeLocale,
  };
}
