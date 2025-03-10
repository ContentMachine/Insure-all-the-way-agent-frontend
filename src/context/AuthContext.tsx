"use client";

import { requestHandler } from "@/helpers/requestHandler";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { requestType, userType } from "@/utilities/types";
import { useRouter } from "../../node_modules/next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AuthContextValuesType = {
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
  requestState: requestType;
  logout: () => void;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextValuesType);

const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  // States
  const [user, setUser] = useState<null | userType>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // ROuter
  const router = useRouter();

  //   Requests
  const getUser = () => {
    requestHandler({
      url: "/auth/profile",
      method: "GET",
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        setUser(res?.data?.user);
      },
      errorFunction(err) {
        // logout();
        setUser(null);
      },
    });
  };

  const logout = () => {
    // if (typeof window !== "undefined") {
    //   localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    // }
    setUser(null);
    router.push(routes.SIGN_IN);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, requestState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
