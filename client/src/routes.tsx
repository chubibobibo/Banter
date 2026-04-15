import { createRootRoute, createRoute } from "@tanstack/react-router";
import {
  HomeLayoutPage,
  RegisterPage,
  LoginPage,
  LandingPage,
  UpdateUserPage,
  DashboardLayoutPage,
  DashboardHome,
} from "./utils";

import ProtectPages from "./components/ProtectPages";
import Logout from "./pages/Logout";

// Instantiate the root that will envelop all routes
const rootRoute = createRootRoute({
  component: HomeLayoutPage,
});

// create the individual routes, don't forget to define the parent
// @NOTE: getParentRoute returns the parent
const landingPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const registerPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: RegisterPage,
});

const loginPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});

const dashboardLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "dashboard",
  component: () => (
    <ProtectPages>
      <DashboardLayoutPage />
    </ProtectPages>
  ),
});

const updateUserRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "updateUser",
  component: UpdateUserPage,
});

const dashboardHome = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "home",
  component: DashboardHome,
});

const logoutRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "logout",
  component: Logout,
});

// create the route tree that will contain the rootRoute and all the other routes as children
export const routeTree = rootRoute.addChildren([
  landingPageRoute,
  registerPageRoute,
  loginPageRoute,
  dashboardLayout,
  dashboardHome,
  updateUserRoute,
  logoutRoute,
]);
