import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./features/auth/auth";

import "./index.css";
import { store } from "./app/store";
import { Paths } from "./app/paths";
import Register from "./pages/register";
import Login from "./pages/login";
import HomePage from "./pages/homePage";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <HomePage />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
