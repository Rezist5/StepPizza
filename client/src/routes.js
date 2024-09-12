import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

import {
    ADMIN_ROUTE,
    MAIN_ROUTE,
    PRODUCTS_ROUTE,
    CART_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts.js"; 


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: PRODUCTS_ROUTE + '/:type',  
        Component: ProductPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    }
];
