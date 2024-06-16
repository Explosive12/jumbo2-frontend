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
import { useUserStore } from '@/stores/userStore';

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
      const userStore = useUserStore();
      userStore.register(this.username, this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.log(error);
            this.statusmessage = error.response && error.response.data && error.response.data.errorMessage
                ? error.response.data.errorMessage
                : 'An error occurred';
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