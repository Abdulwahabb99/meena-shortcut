import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { QUERY_KEYS } from "constants/queryKeys";
import type { MoyasarPaymentPayload } from "services/payment/buildMoyasarPayload";
import { postMoyasarPayment } from "services/payment/moyasarPaymentApi";

export const moyasarPaymentMutationKey = [{ scope: QUERY_KEYS.MOYASAR_PAYMENT }] as const;

export function useMoyasarPaymentMutation(
  options?: Omit<
    UseMutationOptions<unknown, AxiosError, MoyasarPaymentPayload>,
    "mutationKey" | "mutationFn"
  >,
) {
  return useMutation({
    mutationKey: [...moyasarPaymentMutationKey],
    mutationFn: postMoyasarPayment,
    ...options,
  });
}
