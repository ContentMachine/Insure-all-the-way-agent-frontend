export const PAYSTACK_PUBLIC_KEY =
  process?.env?.NODE_ENV === "development"
    ? process?.env?.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    : process?.env?.NEXT_PUBLIC_PAYSTACK_PUBLIC_LIVE_KEY;
