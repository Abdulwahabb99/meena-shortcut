import * as yup from "yup";

/** Saudi mobile without country code: digit 5 then 8 digits (e.g. 512345671) */
export const SAUDI_MOBILE_REGEX = /^5[0-9]{8}$/;

/**
 * @param {function} t - i18n translate (e.g. useTranslate().t)
 */
export function createCustomerDetailsSchema(t) {
  return yup.object({
    firstName: yup
      .string()
      .trim()
      .required(t("orderFlow.errors.firstNameRequired")),
    lastName: yup
      .string()
      .trim()
      .required(t("orderFlow.errors.lastNameRequired")),
    phone: yup
      .string()
      .trim()
      .required(t("orderFlow.errors.phoneRequired"))
      .matches(SAUDI_MOBILE_REGEX, t("orderFlow.errors.phoneInvalidSaudi")),
    idNumber: yup
      .string()
      .trim()
      .required(t("orderFlow.errors.idRequired"))
      .matches(/^\d+$/, t("orderFlow.errors.idDigitsOnly")),
  });
}
