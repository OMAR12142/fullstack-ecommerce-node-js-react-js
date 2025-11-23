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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SingleProductScreen } from "./screens/SingleProductScreen.jsx";
import { Provider } from "react-redux";
import { CartScreen } from "./screens/CartScreen.jsx";
import { Login } from "./screens/Login.jsx";
import { Register } from "./screens/Register.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivteRoute from "./components/PrivteRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import Profile from "./screens/Profile.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductsScreen from "./screens/admin/ProductsScreen.jsx";
import { ProductEditScreen } from "./screens/admin/ProductEditScreen.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import UserEdit from "./screens/admin/UserEdit.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Homescreen />} />
      <Route path="/search/:keyword" element={<Homescreen />} />
      <Route path="/page/:pageNumber" element={<Homescreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<Homescreen />}
      />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="product/:id" element={<SingleProductScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivteRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productslist" element={<ProductsScreen />} />
        <Route
          path="/admin/productslist/:pageNumber"
          element={<ProductsScreen />}
        />

        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route
          path="/admin/product/:pageNumber"
          element={<ProductEditScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/userlist/:id/edit" element={<UserEdit />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
