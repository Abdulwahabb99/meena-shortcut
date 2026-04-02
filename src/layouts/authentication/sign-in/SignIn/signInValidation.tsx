import * as yup from "yup";

export const getSignInValidationSchema = (t) =>
  yup.object({
    email: yup
      .string()
      .email(t("auth.emailInvalid"))
      .required(t("auth.emailRequired")),
    password: yup.string().required(t("auth.passwordRequired")),
  });

// Fallback for non-i18n usage
export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
