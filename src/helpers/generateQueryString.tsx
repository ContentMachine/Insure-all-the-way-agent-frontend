import { queryObjectType } from "@/utilities/types";

export const generateQueryString = (
  baseRoute: string,
  params: queryObjectType
) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => !!value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryString ? `${baseRoute}?${queryString}` : baseRoute;
};
