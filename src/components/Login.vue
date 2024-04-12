<template>
  <section class="d-flex align-items-center justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Login</h2>
          <form>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username</label>
              <input id="inputUsername" type="text" class="form-control" v-model="username"/>
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password" id="inputPassword" />
            </div>
            <button type='button' @click="login()" class="btn btn-primary">Login</button>
            <div v-if="statusmessage" class="alert alert-danger status-message mt-3">
              {{ statusmessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '../axios-auth.js';


export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      statusmessage: ""
    };
  },
  methods: {
    login() {
      axios.post('users/login', {
        username: this.username,
        password: this.password
      }).then (response => {
        console.log (response);
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('role', response.data.user.role);
          this.$router.push('/');

      }).catch(error => {
        console.log(error);
        this.statusmessage = error.response.data.errorMessage;
      });
    },
  }
};
</script>

<style>
.status-message {

  transition: all 0.3s ease;
}
</style>