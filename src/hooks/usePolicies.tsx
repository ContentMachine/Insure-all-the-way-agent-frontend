import { queryObjectType } from "@/utilities/types";
import useGetHook from "./useGetHook";
import { generateQueryString } from "@/helpers/generateQueryString";

export const useUserPoliciesStats = () => {
  const url = `/admin/stats`;

  return useGetHook(url);
};

export const useUsers = (params?: queryObjectType) => {
  const url = params
    ? generateQueryString("/admin/users", params)
    : `/admin/users`;

  return useGetHook(url);
};

export const useUserById = (id: string) => {
  const url = id ? `/admin/users/${id}` : null;

  return useGetHook(url);
};

export const usePolicies = (params?: queryObjectType) => {
  const url = params
    ? generateQueryString("/admin/policies", params)
    : "/admin/policies";

  return useGetHook(url);
};

export const usePolicyById = (id: string) => {
  const url = `/admin/policies/${id}`;

  return useGetHook(url);
};

export const useAgents = () => {
  const url = `/admin/agents`;

  return useGetHook(url);
};

export const useClaims = () => {
  const url = `/admin/claims`;

  return useGetHook(url);
};

export const useClaimById = (id: string) => {
  const url = id ? `/admin/claims/${id}` : null;

  return useGetHook(url);
};

export const usePoliciesStats = (policy?: string) => {
  const url = !policy
    ? `/admin/policies/policy/stats`
    : `/admin/policies/policy/stats?insuranceType=${policy}`;

  return useGetHook(url);
};

export const useClaimsStats = () => {
  const url = `/admin/claims/claim/stats`;

  return useGetHook(url);
};

export const useUserStats = () => {
  const url = `/admin/users/user/stats`;

  return useGetHook(url);
};

export const useAllPolicies = () => {
  const url = `/policies/policy`;

  return useGetHook(url);
};

export const usePoliciesAnalytics = () => {
  const url = `/admin/analytics/combined`;

  return useGetHook(url);
};
