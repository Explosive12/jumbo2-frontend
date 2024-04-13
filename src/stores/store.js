import { createStore } from 'vuex';

export const store = createStore({
  state: {
    isLoggedIn: false,
    username: null,
    role: null,
  },
  mutations: {
    logout(state) {
        console.log('logout');
      state.isLoggedIn = false;
      state.username = null;
      state.role = null;
    },
    setUser(state, { username, role }) {
      state.isLoggedIn = true;
      state.username = username;
      state.role = role;
    },
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      commit('logout');
      alert('You have been logged out.');
    },
    setUser({ commit }, { jwt, username, role }) {
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      commit('setUser', { username, role });
      alert ('You have been logged in.');
    },
  },
});