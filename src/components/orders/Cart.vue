<template>
  <div>
    <h2>Cart</h2>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <OrderItem
                  v-for="item in products"
                  :key="item.id"
                  :item="item"
                  @remove="removeFromCart"
                />
              </tbody>
            </table>
            <div class="d-flex justify-content-end">
              <h4>Total: {{ total }}</h4>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary" @click="checkout">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth.js";
import { mapState } from "vuex";
import OrderItem from "./OrderItem.vue";

export default {
  name: "App",
  components: {
    Navigation,
    OrderItem,
  },
  computed: {
    ...mapState(["products"]),
    total() {
      const total = this.products.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      return this.formatPrice(total);
    },
  },
  methods: {
    formatPrice(price) {
      return (
        "€" +
        Number(price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    },
    checkout() {
      console.log(this.products);
      console.log(this.total);
      axios
        .post("/cart/order", {
          products: this.products,
          total: this.total,
        })
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("clearCart");
          this.$router.push("/paid");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
