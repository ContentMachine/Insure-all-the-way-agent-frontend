import useSWR, { SWRConfiguration } from "swr";
import useError from "./useError";
import { useEffect } from "react";
import { swrConfigs } from "@/config/SWRConfig";

const useGetHook = (url: string | null, props?: SWRConfiguration) => {
  const { data, error, isLoading, isValidating } = useSWR(url, {
    ...props,
    ...swrConfigs,
  });

  // Context
  const { errorFlowFunction } = useError();

  useEffect(() => {
    if (error) {
      errorFlowFunction(error);
    }
  }, [error]);

  return { data, error, isLoading, isValidating };
};

export default useGetHook;
