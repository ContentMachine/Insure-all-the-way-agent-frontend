"use client";

import axiosInstance from "@/services";
import { AxiosResponse } from "axios";
import { SWRConfig, SWRConfiguration } from "swr";

type UseSWRConfigProps = {
  children: React.ReactNode;
};

export const swrConfigs: SWRConfiguration = {
  revalidateOnFocus: false,
  // revalidateOnMount: false,
};

type Fetcher = (
  ...args: Parameters<typeof axiosInstance.get>
) => Promise<AxiosResponse<any>>;

const fetcher: Fetcher = async (url, config) => {
  const headers = {
    ...config?.headers,
  };

  return axiosInstance.get(url, { ...config, headers }).then((res) => res);
};

const UseSWRConfigProvider = ({ children }: UseSWRConfigProps) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default UseSWRConfigProvider;
