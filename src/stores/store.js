import axios from "axios";
import { createStore } from "vuex";

export const store = createStore({
  state: {
    isLoggedIn: false,
    username: null,
    role: null,
    products: [],
  },
  mutations: {
    logout(state) {
      console.log("logout");
      state.isLoggedIn = false;
      state.username = null;
      state.role = null;
    },
    setUser(state, { username, role }) {
      state.isLoggedIn = true;
      state.username = username;
      state.role = role;
    },
    addToCart(state, { product, quantity }) {
      let productInCart = state.products.find(
        (item) => item.product.id === product.id
      );
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        state.products.push({ product: product, quantity: quantity });
      }
      console.log(state.products);
    },
    removeProduct(state, { productId }) {
      state.products = state.products.filter(
        (product) => product.productId !== productId
      );
    },
    clearCart(state) {
      state.products = [];
    },
  },
  actions: {
    addToCart({ commit }, { product, quantity }) {
      commit("addToCart", { product, quantity });
    },
    removeProduct({ commit }, { productId }) {
      commit("removeProduct", { productId });
      alert("Product removed from cart.");
    },
    logout({ commit }) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      axios.defaults.headers.common["Authorization"] = "";
      commit("logout");
      alert("You have been logged out.");
    },
    setUser({ commit }, { jwt, username, role }) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      commit("setUser", { username, role });
      alert("You have been logged in.");
    },
  },
});
