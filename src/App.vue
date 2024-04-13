<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'
import axios from './axios-auth.js'
import { store } from './stores/store.js'; 

export default {
  name: "App",
  components: {
    Navigation
  }, 
  created() {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (jwt) {
      console.log('setting user' + jwt + username + role)
      this.$store.dispatch('setUser', { jwt, username, role });
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      axios.get('users/verify')
        .then(response => {
          if (response.data.valid) {
            this.$router.push('/');
          } else {
            store.commit('logout');
            this.$router.push('/login');
          }
        })
        .catch(error => {
          store.commit('logout');
          this.$router.push('/login');
        });
    }
  },
};
</script>

<style>
</style>
