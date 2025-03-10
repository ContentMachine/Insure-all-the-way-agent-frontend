"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { routes } from "@/utilities/routes";
import Loader from "../Loader/Loader";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  // Router
  const router = useRouter();

  // Context
  const { requestState } = useContext(AuthContext);

  // Local
  const accessToken =
    typeof window !== "undefined" &&
    localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  useEffect(() => {
    if (!requestState?.isLoading && !accessToken) {
      router.push(routes.SIGN_IN);
    }
  }, [accessToken, requestState?.isLoading, router]);

  if (requestState.isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default RequireAuth;
