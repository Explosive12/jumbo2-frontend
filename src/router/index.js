import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import ProductList from "../components/products/ProductList.vue";
import CreateProduct from "../components/products/CreateProduct.vue";
import EditProduct from "../components/products/EditProduct.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Admin from "../components/AdminUsers.vue";
import Cart from "../components/orders/Cart.vue";
import Paid from "../components/orders/Paid.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/products", component: ProductList },
    { path: "/login", component: Login },
    { path: "/logout", component: Login },
    { path: "/register", component: Register },
    { path: "/createproduct", component: CreateProduct },
    { path: "/editproduct/:id", component: EditProduct, props: true },
    { path: "/admin", component: Admin },
    { path: "/cart", component: Cart },
    { path: "/paid", component: Paid },
  ],
});

export default router;
