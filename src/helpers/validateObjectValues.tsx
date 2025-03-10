import { capitalize } from "./capitalize";

/**
 * Checks if all values in an object are filled (not null, undefined, or empty string).
 */
export const areAllValuesFilled = (obj: Record<string, unknown>): boolean => {
  return Object.values(obj).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
};

/**
 * Formats an object's keys and values into an array of objects
 * with `title` (the formatted key) and `value` (a string).
 * @param obj - The original object with string keys and unknown values.
 * @param exceptions - Keys to be excluded from formatting (default is ["_id"]).
 */
export function formatObject(
  obj: Record<string, unknown>,
  exceptions: string[] = ["_id", "__v", "plan"]
): Array<{ title: string; value: string }> {
  const entries = Object?.entries(obj) as [string, unknown][] as any;

  return entries
    .filter(([key]: any) => !exceptions.includes(key))
    .map(([key, value]: any) => ({
      title: formatKey(key),
      value:
        typeof value === "string" ? capitalize(value) : String(value ?? ""),
    }));
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
