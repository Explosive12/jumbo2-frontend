<template>
  <section class="d-flex align-items-center justify-content-center section-margin">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Login</h2>
          <form>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username</label>
              <input
                id="inputUsername"
                type="text"
                class="form-control"
                v-model="username"
                autocomplete="current-username"
              />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password"
                id="inputPassword"
                autocomplete="current-password"
              />
            </div>
            <button type="button" @click="login()" class="btn btn-primary">
              Login
            </button>
            <div
              v-if="statusMessage"
              class="alert alert-danger status-message mt-3"
            >
              {{ statusMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      statusMessage: "",
    };
  },
  methods: {
    login() {
      const userStore = useUserStore();
      userStore
          .login(this.username, this.password)
          .then(() => {
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              this.statusMessage = error.response.data.errorMessage;
            } else {
              this.statusMessage = "An error occurred while trying to log in.";
            }
          });
    },
  },
};
</script>

<style>
.status-message {
  transition: all 0.3s ease;
}

.section-margin {
  margin-top: 50px;
}

</style>
