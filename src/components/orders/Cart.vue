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
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import OrderItem from "./OrderItem.vue";
import axios from "../../axios-auth.js";

export default {
  name: "App",
  components: {
    OrderItem,
  },
  computed: {
    products() {
      const cartStore = useCartStore();
      return cartStore.getProducts;
    },
    total() {
      const cartStore = useCartStore();
      const total = cartStore.getProducts.reduce(
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
    removeFromCart(productId) {
      const cartStore = useCartStore();
      console.log("Product Removed from cart");
      cartStore.removeProduct(productId);
    },
    checkout() {
      const cartStore = useCartStore();
      if (!useUserStore().isLoggedIn) {
        alert("Please log in to checkout");
        return;
      }
      if (cartStore.getProducts.length === 0) {
        alert("Cart is empty");
        return;
      }
      console.log(cartStore.getProducts);
      console.log(this.total);

      const token = useUserStore().token;
      axios
          .post("/cart/order", {
            products: cartStore.getProducts,
            total: this.total,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((res) => {
            console.log(res.data);
            cartStore.clearCart();
            this.$router.push("/paid");
          })
          .catch((error) => console.log(error));
    },
  },
};
</script>
