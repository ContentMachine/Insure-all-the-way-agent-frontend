export const routes = Object.freeze({
  BASE_URL: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  POLICIES: "/policies",
  USERS: "/users",
  CLAIMS: "/claims",
  LEADS: "/leads",
});

export const dashboardRoutes = [
  {
    title: "Dashboard",
    route: routes.DASHBOARD,
    properties: ["isProtected"],
  },
  {
    title: "Leads",
    route: routes.LEADS,
    properties: ["isProtected"],
  },
];
