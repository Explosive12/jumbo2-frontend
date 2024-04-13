<template>
    <section class="d-flex align-items-center justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center mb-4">Register your account</h2>
            <form>
              <div class="mb-3">
                <label for="inputUsername" class="form-label">Username</label>
                <input id="inputUsername" type="text" class="form-control" v-model="username" required/>
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password" id="inputPassword" required />
              </div>
              <div class="mb-3">
                <label for="inputMail" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="email" id="inputMail" required/>
            </div>
              <button type='button' @click="register()" class="btn btn-primary">register</button>
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
    name: "Register",
    data() {
        return {
            username: "",
            password: "",
            email: "",
            statusmessage: ""
        };
    },
    methods: {
        register() {
            axios.post('users/register', {
                username: this.username,
                password: this.password,
                email: this.email
            }).then(response => {
                console.log(response);
                this.$store.dispatch('setUser', {
                    jwt: response.data.jwt,
                    username: response.data.user.username,
                    role: response.data.user.role
                });
                this.$router.push('/');
            }).catch(error => {
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