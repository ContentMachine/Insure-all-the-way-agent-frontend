import { queryObjectType } from "@/utilities/types";
import useGetHook from "./useGetHook";
import { generateQueryString } from "@/helpers/generateQueryString";

export const useUserPoliciesStats = () => {
  const url = `/admin/stats`;

  return useGetHook(url);
};

export const useAgentsPolicies = () => {
  const url = `/agent/policies`;

  return useGetHook(url);
};

export const usePolicyById = (id: string) => {
  const url = `/agent/policies/${id}`;

  return useGetHook(url);
};
