/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "@/services/api";

type LoginData = {
  email: string;
  password: string;
};

type User = {
  accessToken: string;
  email: string;
  id: string;
  name: string;
};

type AuthContextData = {
  login(data: LoginData): Promise<void>;
  logout(): void;
  isAuth: boolean;
  user: User | undefined;
};

export const AuthContext = createContext({} as AuthContextData);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const isAuth = !!user;
  const { push } = useRouter();

  const login = useCallback(async ({ email, password }: LoginData) => {
    destroyCookie(undefined, "@next-token");
    try {
      const { data } = await api.post("/api/account/login", { email, password });
      setCookie(undefined, "@next-token", data.account.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", //all app can see
      });
      setUser(data.account);
      api.defaults.headers.common["x-access-token"] = data.account.accessToken;
      push("/admin/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  }, []);

  const silentLogin = useCallback(async () => {
    const { "@next-token": token } = parseCookies();
    if (token) {
      try {
        const { data } = await api.post("/api/account/token-login", { token });
        setUser(data.account);
        return;
      } catch (error) {
        if (error instanceof AxiosError) {
        }
      }
    }
  }, []);

  const logout = useCallback(() => {
    destroyCookie(undefined, "@next-token", {
      path: '/'
    });
    setUser(undefined);
    const { "@next-token": token } = parseCookies();
    push("/");
  }, []);

  useEffect(() => {
    silentLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ login, isAuth, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
