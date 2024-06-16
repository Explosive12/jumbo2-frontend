<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      <div class="card-body">
        <img :src="product.image" :alt="product.title" :title="product.title" />
        <div class="float-start">
          <p>{{ product.name }}</p>
          <p>
            <small>{{ product.category.name }}</small>
          </p>
        </div>
        <span class="price float-end">{{ formatPrice(product.price) }}</span>
      </div>
      <div class="card-footer" v-if="!isAdmin">
        <div class="mb-3">
          Quantity: <input type="number" min="1" v-model="quantity" />
        </div>
        <button
            class="btn btn-primary mt-3"
            @click="addToCart(product, quantity)"
        >
          Add to Cart
        </button>
        <div
            v-if="statusMessage"
            class="alert alert-warning status-message mt-3"
        >
          {{ statusMessage }}
        </div>
      </div>

      <div class="card-footer" v-if="isAdmin">
        <button class="btn btn-warning mt-3" @click="editProduct(product.id)">
          Edit</button
        >&nbsp;&nbsp;
        <button class="btn btn-danger mt-3" @click="deleteProduct(product.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";
import axios from "@/axios-auth.js";

export default {
  data() {
    return {
      quantity: 1,
      statusMessage: "",
    };
  },
  name: "ProductListItem",
  props: {
    product: Object,
  },
  computed: {
    isAdmin() {
      const userStore = useUserStore();
      return userStore ? userStore.role === 1 : false;
    },
  },
  methods: {
    deleteProduct(id) {
      axios
          .delete("/products/" + id)
          .then((result) => {
            console.log(result);
            this.$emit("update");
          })
          .catch((error) => console.log(error));
    },
    addToCart(product, quantity) {
      const cartStore = useCartStore();
      cartStore.addToCart(product, quantity);
      console.log("Product added to cart");
      this.$emit("update");
      this.statusMessage = `${product.name} added to cart, quantity: ${quantity}`;
    },
    editProduct(id) {
      this.$router.push("/editproduct/" + id);
    },
    formatPrice(price) {
      return (
          "€" +
          Number(price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
      );
    },
  },
};
</script>

<style></style>