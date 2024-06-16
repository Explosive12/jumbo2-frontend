<template>
  <div>
    <h1>Admin Orders</h1>
    <div class="pagination">
      <button @click="decreaseOffset">Previous</button>
      <button @click="increaseOffset">Next</button>
    </div>
    <section>
      <table class="table">
        <thead>
        <tr>
          <th>User ID</th>
          <th>Status</th>
          <th>Date</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.userid }}</td>
          <td>{{ getStatusName(order.status) }}</td>
          <td>{{ order.date }}</td>
          <td>{{ formatPrice(order.total) }}</td>
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
  name: "AdminOrders",
  data() {
    return {
      orders: [],
      offset: 0,
      limit: 10,
    };
  },
  methods: {
    increaseOffset() {
      this.offset += this.limit;
      this.fetchOrders();
    },

    decreaseOffset() {
      if (this.offset >= this.limit) {
        this.offset -= this.limit;
      }
      this.fetchOrders();
    },
    getStatusName(status) {
      const statusNames = {
        1: 'Cancelled',
        2: 'Paid'
      };
      return statusNames[status] || 'Unknown';
    },
    fetchOrders() {
      const token = useUserStore().getToken;
      axios
          .get("admin/orders", {
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
            this.orders = res.data;
          })
          .catch((error) => console.log(error));
    },
    formatPrice(price) {
      return price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    },
  },

  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
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