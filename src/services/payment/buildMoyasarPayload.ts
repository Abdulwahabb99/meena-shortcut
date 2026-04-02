export interface MoyasarPaymentPayload {
  amount: number;
  description: string;
  PhoneNumber: string;
  nationalId: string;
  FirstName: string;
  LastName: string;
}

export function buildMoyasarPaymentPayload({
  amountSar,
  description,
  phoneNumber,
  nationalId,
  firstName,
  lastName,
}: {
  amountSar: number;
  description: string;
  phoneNumber: string;
  nationalId: string;
  firstName: string;
  lastName: string;
}): MoyasarPaymentPayload {
  return {
    amount: amountSar,
    description,
    PhoneNumber: phoneNumber,
    nationalId,
    FirstName: firstName,
    LastName: lastName,
  };
}
