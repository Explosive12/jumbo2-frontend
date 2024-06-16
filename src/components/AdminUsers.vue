<template>
  <div>
    <h1>Admin Users</h1>
    <input
        type="text"
        v-model="searchBox"
        placeholder="Search username"
        class="form-control"
        @input="searchUsers"
    />
    <div class="pagination">
    <button @click="decreaseOffset">Previous</button>
    <button @click="increaseOffset">Next</button>
    </div>

    <section>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Role Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.id">
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
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth.js";
import {useUserStore} from "@/stores/userStore";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      searchBox: "",
      offset: 0,
      limit: 10,
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
    searchUsers() {
      const token = useUserStore().getToken;
      axios
          .get("admin/users", {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params: {
              search: this.searchBox
            }
          })
          .then((res) => {
            console.log(res.data);
            this.users = res.data;
          })
          .catch((error) => console.log(error));
    },
    increaseOffset() {
      this.offset += this.limit;
      this.fetchUsers();
    },
    decreaseOffset() {
      if (this.offset >= this.limit) {
        this.offset -= this.limit;
      }
      this.fetchUsers();
    },
    fetchUsers() {
      const token = useUserStore().getToken;
      axios
          .get("admin/users", {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params: {
              offset: this.offset,
              limit: this.limit
            }
          })
          .then((res) => {
            console.log(res.data);
            this.users = res.data;
          })
          .catch((error) => console.log(error));
    }
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
.form-control {
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background-color: #0056b3;
}

</style>
