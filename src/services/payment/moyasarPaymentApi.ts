import axios from "axios";
import type { MoyasarPaymentPayload } from "./buildMoyasarPayload";
import {
  PAYMENT_API_BASE,
  MOYASAR_ENDPOINT_PATH,
  assertPaymentApiConfigured,
} from "./paymentConfig";

const paymentClient = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * POST `{PAYMENT_API_BASE}/Moyasar` with Moyasar payment payload.
 */
export async function postMoyasarPayment(
  payload: MoyasarPaymentPayload,
): Promise<unknown> {
  assertPaymentApiConfigured();
  const { data } = await paymentClient.post<unknown>(
    `${PAYMENT_API_BASE}${MOYASAR_ENDPOINT_PATH}`,
    payload,
  );
  return data;
}
