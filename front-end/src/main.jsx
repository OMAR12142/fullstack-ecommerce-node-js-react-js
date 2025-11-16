import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";

import App from "./App.jsx";
import { Homescreen } from "./screens/Homescreen.jsx";
import { SingleProductScreen } from "./screens/SingleProductScreen.jsx";
import { Provider } from "react-redux";
import { CartScreen } from "./screens/CartScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Homescreen />} />
      <Route path="/cart" element={<CartScreen />} />

      <Route path="product/:id" element={<SingleProductScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
