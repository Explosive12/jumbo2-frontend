<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
      <router-link to="/" class="brand me-3" >Jumbo 2</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item me-3">
            <router-link to="/products" class="nav-link" active-class="active">Products</router-link>
          </li>
          <li class="nav-item me-3" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
          <li class="nav-item me-3" v-if="!isLoggedIn">
            <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
          </li>
          <li class="nav-item me-3" v-if="isLoggedIn">
            <a class="nav-link "> Welcome, {{ username }} </a>
          </li>
          <li class="nav-item me-3" active-class="active" v-if="role == '1'">
            <router-link to="/createproduct" class="nav-link">Create Product</router-link>
          </li>
          <li class="nav-item me-3" active-class="active" v-if="role == '1'">
            <router-link to="/admin" class="nav-link">Admin</router-link>
          </li>

          <li class="nav-item me-3" v-if="isLoggedIn">
            <a class="nav-link logout-link" @click="logout">Logout</a>
          </li>


        </ul>
      </div>
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
      this.role = localStorage.getItem("role");
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  font-size: 40px;
  color : white;
  font-family:monospace;
  letter-spacing: 2px;
}

.brand:hover {
  text-decoration: none;
  color:aliceblue;
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