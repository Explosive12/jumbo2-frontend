<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>      
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active"
            >Products</router-link
          >
        </li>
        <li class="nav-item" v-if="role === 1">
          <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>

        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link" active-class="active"
            >Register</router-link
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link"> Welcome,
            {{ username }} </a>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("jwt"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem("jwt");
      this.username = localStorage.getItem("username");
      
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>