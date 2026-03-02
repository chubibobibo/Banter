import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import { routeTree } from "./routes";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ErrorPage from "./pages/ErrorPage";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer, Zoom } from "react-toastify";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: PageNotFound,
  defaultErrorComponent: ErrorPage,
});

function App() {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
      <ToastContainer position='top-center' transition={Zoom} closeOnClick />
    </>
  );
}

export default App;
