<template>
  <div>
    <h1>Admin</h1>
    <input
      type="text"
      v-model="searchBox"
      placeholder="Search username"
      class="form-control"
    />
    <table class="table">
      <thead>
        <tr>
          <th scope="col"># ID</th>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Role Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>
            <select v-model="user.role" @change="updateRole(user)">
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../axios-auth.js";
import {useUserStore} from "@/stores/userStore";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      searchBox: "",
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchBox.toLowerCase())
      );
    },
  },
  methods: {
    updateRole(user) {
      user.role = parseInt(user.role);
      let confirmation = confirm(
        "Role of " +
          user.username +
          " is about to be updated to " +
          (user.role === "1" ? "admin" : "user") +
          ". Do you want to proceed?"
      );
      if (confirmation) {
        const token = useUserStore().getToken;
        axios
            .put(`admin/users/${user.id}`, user, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => console.log(error));
      } else {
        user.role = user.role === "1" ? "2" : "1";
      }
    },
  },
  mounted() {
    axios
      .get("admin/users")
      .then((res) => {
        console.log(res.data);
        this.users = res.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
.form-control {
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}
</style>
