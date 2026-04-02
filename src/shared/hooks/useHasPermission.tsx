import { useAuth } from "./useAuth";

export const useHasPermission = (key: string) => {
  const { user } = useAuth();
  const permissions = user?.permissions;

  if (!Array.isArray(permissions)) return false;
  return permissions.some((permission) => permission === key);
};
