<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
      <router-link to="/" class="brand me-3">Jumbo 2</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item me-3">
            <router-link to="/products" class="nav-link" active-class="active"
              >Products</router-link
            >
          </li>
          <li class="nav-item me-3" active-class="active" v-if="role === 1">
            <router-link to="/createproduct" class="nav-link">Create Product</router-link>
          </li>
          <li class="nav-item me-3" active-class="active" v-if="role === 1">
            <router-link to="/admin/users" class="nav-link">Admin User view</router-link>
          </li>
          <li class="nav-item me-3" active-class="active" v-if="role === 1">
            <router-link to="/admin/orders" class="nav-link">Admin Order view</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item me-3 mb-lg-0" v-if="isLoggedIn">
            <a class="nav-link"> Welcome, {{ username }} </a>
          </li>
          <li class="nav-item me-3 mb-lg-0" v-if="isLoggedIn">
            <a class="nav-link logout-link" @click="logout">Logout</a>
          </li>
          <li class="nav-item me-3 mb-lg-0" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link" active-class="active"
              >Login</router-link
            >
          </li>
          <li class="nav-item me-3 mb-lg-0" v-if="!isLoggedIn">
            <router-link to="/register" class="nav-link" active-class="active"
              >Register</router-link
            >
          </li>
          <li class="nav-item me-3 mb-lg-0">
            <router-link to="/cart" class="nav-link" active-class="active">
              <i class="fas fa-shopping-cart"></i> Cart
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";
import router from "../router/index.js";

export default {
  name: "Navigation",
  computed: {
    isLoggedIn() {
      const userStore = useUserStore();
      return userStore.token !== null;
    },
    username() {
      const userStore = useUserStore();
      return userStore.username;
    },
    role() {
      const userStore = useUserStore();
      return userStore.role;
    },
  },
  methods: {
    logout() {
      const userStore = useUserStore();
      userStore.logout();
      router.push("/");
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Courier New", Courier, monospace;
}

.brand {
  font-weight: bold;
  font-size: 40px;
  color: white;
  font-family: monospace;
  letter-spacing: 2px;
}

.brand:hover {
  text-decoration: none;
  color: aliceblue;
}

.logout-link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.nav-link.active {
  background-color: white;
  color: black;
  font-weight: bold;
}

.nav-link:hover {
  background-color: white;
  color: black;
}
</style>
