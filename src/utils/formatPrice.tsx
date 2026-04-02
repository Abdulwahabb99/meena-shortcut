/**
 * Format price number only (no currency) - for individual items
 */
export const formatPriceNumber = (amount) =>
  amount != null ? Number(amount).toFixed(2) : "0.00";

/**
 * Format price with currency - for final total only
 * Arabic: ريال, English: SAR
 */
export const formatPriceWithCurrency = (amount, locale = "en") => {
  const num = amount != null ? Number(amount).toFixed(2) : "0.00";
  const currency = locale?.startsWith("ar") ? "ريال" : "SAR";
  return `${num} ${currency}`;
};
