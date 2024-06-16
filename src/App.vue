<template>
  <navigation />
  <router-view />
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "Login",
  components: {Navigation},
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
            this.statusMessage = error.response.data.errorMessage;
          });
    },
  },
};
</script>

<style></style>