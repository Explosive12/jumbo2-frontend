<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5 text-center text-primary">Products</h2>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <button
          v-if="role == '1'"
          type="button"
          class="btn btn-outline-primary"
          @click="addProduct"
        >
          Add product
        </button>
        <div>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search products"
            class="form-control"
          />
          <select v-model="selectedCategory" class="form-control mt-2">
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <product-list-item
          v-for="product in filteredProducts"
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
    filteredProducts() {
      let products = this.products;
      if (this.searchTerm) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      if (this.selectedCategory) {
        products = products.filter(
          (product) => product.category_id === this.selectedCategory
        );
      }
      return products;
    },
  },
  data() {
    return {
      products: [],
      categories: [],
      searchTerm: "",
      selectedCategory: "",
    };
  },
  mounted() {
    this.update();
    this.fetchCategories();
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
    fetchCategories() {
      axios
        .get("/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((result) => {
          console.log(result);
          this.categories = result.data;
        })
        .catch((error) => console.log(error));
    },
    addProduct() {
      this.$router.push({ path: "/createproduct" });
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
}

button {
  width: 150px;
}

input,
select {
  width: 200px;
}
</style>
