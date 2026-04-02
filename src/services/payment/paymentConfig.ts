/**
 * Default payment API root when `REACT_APP_PAYMENT_API_BASE` is unset.
 * Used in production (e.g. Vercel) if you forget env — override in Vercel → Settings → Environment Variables.
 */
const DEFAULT_PAYMENT_API_BASE = "https://payment.meena-health.com/api";

function resolvePaymentBase(): string {
  const fromEnv = process.env.REACT_APP_PAYMENT_API_BASE?.trim() ?? "";
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  return DEFAULT_PAYMENT_API_BASE.replace(/\/+$/, "");
}

export const PAYMENT_API_BASE = resolvePaymentBase();

export const MOYASAR_ENDPOINT_PATH = "/Moyasar";

export function getMoyasarPaymentUrl(): string {
  if (!PAYMENT_API_BASE) return "";
  return `${PAYMENT_API_BASE}${MOYASAR_ENDPOINT_PATH}`;
}

export function assertPaymentApiConfigured(): void {
  if (!PAYMENT_API_BASE) {
    throw new Error(
      "Payment API base URL is missing. Set REACT_APP_PAYMENT_API_BASE or use the default in paymentConfig.",
    );
  }
}
