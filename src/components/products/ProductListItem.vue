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
      <div class="mb-3">
        Quantity: <input type="number" min="1" v-model="quantity" />
      </div>
      <div class="card-footer" v-if="role != '1'">
        <button
          class="btn btn-primary mt-3"
          @click="addToCart(product, quantity)"
        >
          Add to Cart
        </button>
        <div
          v-if="statusmessage"
          class="alert alert-warning status-message mt-3"
        >
          {{ statusmessage }}
        </div>
      </div>

      <div class="card-footer" v-if="role == '1'">
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
import axios from "../../axios-auth.js";
import { store } from "../../stores/store.js";

export default {
  data() {
    return {
      quantity: 1,
      statusmessage: "",
    };
  },
  name: "ProductListItem",
  props: {
    product: Object,
  },
  computed: {
    role() {
      return store.state.role;
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
      this.$store.dispatch("addToCart", { product, quantity });
      console.log("Product added to cart");
      this.$emit("update");
      this.statusmessage = `${product.name} added to cart, quantity: ${quantity}`;
    },
    editProduct(id) {
      this.$router.push("/editproduct/" + id);
    },
    // https://stackoverflow.com/questions/31581011/how-to-use-tolocalestring-and-tofixed2-in-javascript
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
