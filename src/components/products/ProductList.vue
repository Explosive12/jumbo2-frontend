<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Products</h2>
        <button v-if="role == '1'" type="button" class="btn btn-primary mt-3" @click="addProduct">
            Add product
          </button>
      <div class="row mt-3">
        <product-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"
          @update="update"
        />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth.js";
import ProductListItem from "./ProductListItem.vue";
import { store } from "../../stores/store.js";

export default {
  name: "ProductList",
  components: {
    ProductListItem,
  },
  computed: {
    role() {
      return store.state.role;
    },
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      axios
        .get("/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((result) => {
          console.log(result);
          this.products = result.data;
        })
        .catch((error) => console.log(error));
    },
    addProduct() {
    this.$router.push({ path: '/createproduct' });
    },
  },
};
</script>

<style>
</style>