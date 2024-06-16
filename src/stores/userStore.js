import { defineStore } from 'pinia';
import axiosAuth from "@/axios-auth";

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: null,
    email: null,
    token: null,
    role: null,
  }),
  getters: {
    isLoggedIn: (state) => state.username !== null,
    isAdmin: (state) => state.role === "1",
    getUsername: (state) => state.username,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    getRole: (state) => state.role,
  },
  actions: {
    setUserAndStore(res) {
      console.log(res.data)
      this.username = res.data.user.username;
      this.token = res.data.jwt;
      this.role = res.data.user.role;
      this.email = res.data.user.email;
      axiosAuth.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

      localStorage.setItem("username", this.username);
      localStorage.setItem("token", this.jwt);
      localStorage.setItem("role", this.role);
      localStorage.setItem("email", this.email);

      console.log(useUserStore().$state);
    },
    login(username, password) {
      return new Promise((resolve, reject) => {
        axiosAuth
            .post("/users/login", {
              username: username,
              password: password,
            })
            .then((res) => {
              this.setUserAndStore(res);
                alert("You have successfully logged in");
              resolve();
            })
            .catch((error) => reject(error));
      });
    },
    register(username, email, password) {
      return new Promise((resolve, reject) => {
        axiosAuth
            .post("users", {
              username: username,
              email: email,
              password: password,
            })
            .then((res) => {
              this.setUserAndStore(res);
              alert("You have successfully created your account. You are now logged in");
              resolve();
            })
            .catch((error) => reject(error));
      });
    },
    logout() {
      this.username = null;
      this.email = null;
      this.token = null;
      this.role = null;
      delete axiosAuth.defaults.headers.common['Authorization'];

      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");

      alert("You have logged out");
    },
    setUsername(username) {
      this.username = username;
    },
    setEmail(email) {
      this.email = email;
    },
    setToken(token) {
      this.token = token;
    },
    setRole(role) {
      this.role = role;
    },
  },
});