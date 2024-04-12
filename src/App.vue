<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'
import axios from './axios-auth.js'

export default {
  name: "App",
  components: {
    Navigation
  }, 

  created() {
    const token = localStorage.getItem('jwt');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('users/verify')
        .then(response => {
          if (response.data.valid) {
            this.$router.push('/');
          } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            this.$router.push('/login');
          }
        })
        .catch(error => {
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          this.$router.push('/login');
        });
    }
  },

};
</script>

<style>
</style>
