import { SUPER_ADMIN } from "constants/names";
import { SELLER } from "constants/names";
import { OPERATOR } from "constants/names";
import { ADMIN } from "constants/names";
import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

export interface AuthUser {
  role?: string;
  permissions?: string[];
  [key: string]: unknown;
}

export interface AuthContextValue {
  user: AuthUser | null;
  login: (params?: { data?: AuthUser }) => void;
  logout: () => void;
  ready: boolean;
  IS_ADMIN: boolean;
  IS_SUPER_ADMIN: boolean;
  IS_SELLER: boolean;
  IS_OPERATOR: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as AuthUser);
    }
    setReady(true);
  }, []);

  const login = (params: { data?: AuthUser } = {}) => {
    if (!params?.data) return;

    const { data } = params;
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
  };

  const IS_ADMIN = user?.role === ADMIN;
  const IS_SUPER_ADMIN = user?.role === SUPER_ADMIN;
  const IS_SELLER = user?.role === SELLER;
  const IS_OPERATOR = user?.role === OPERATOR;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        ready,
        IS_ADMIN,
        IS_SUPER_ADMIN,
        IS_SELLER,
        IS_OPERATOR,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
