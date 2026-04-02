import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { loginUser } from "services/api/login";
import { useAuth } from "shared/hooks/useAuth";

export const logInKey = [{ scope: QUERY_KEYS.LOG_IN }];

export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};
