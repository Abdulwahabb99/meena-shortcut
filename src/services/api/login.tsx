import { URL } from "constants/url";

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("خطأ في تسجيل الدخول");
  }

  return res.json();
};
//
