import { createRootRoute, createRoute } from "@tanstack/react-router";
import {
  HomeLayoutPage,
  RegisterPage,
  LoginPage,
  LandingPage,
  UpdateUserPage,
} from "./utils";

import ProtectPages from "./components/ProtectPages";

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

const updateUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/updateUser",
  component: () => <ProtectPages>UpdateUserPage</ProtectPages>,
});

// create the route tree that will contain the rootRoute and all the other routes as children
export const routeTree = rootRoute.addChildren([
  landingPageRoute,
  registerPageRoute,
  loginPageRoute,
  updateUserRoute,
]);
