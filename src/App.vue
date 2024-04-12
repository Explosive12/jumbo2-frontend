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
    console.log('Token:', token); 
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('users/verify')
        .then(response => {
          console.log(response);
          if (response.data.jwt) {
            console.log('Valid token');
            this.$router.push('/');
          } else {
            console.log('Invalid token');
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.log(error);
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
