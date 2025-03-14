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

export const useAgentLeads = () => {
  const url = `/agent/lead`;

  return useGetHook(url);
};

export const useAgentLeadsById = (id: string) => {
  const url = id ? `/agent/lead/${id}` : null;

  return useGetHook(url);
};

export const useAllInsuranceTypes = () => {
  const url = `/policies/policy`;

  return useGetHook(url);
};

export const useAllInsuranceTypesById = (id: string) => {
  const url = id ? `/policies/policy/${id}` : null;

  return useGetHook(url);
};
