import { useTranslation } from "react-i18next";

/**
 * Hook for translations - use t(key) to get translated text
 * Keys follow namespace.path format, e.g. "common.home", "home.title"
 */
export default function useTranslate() {
  const { t } = useTranslation();
  return { t };
}
