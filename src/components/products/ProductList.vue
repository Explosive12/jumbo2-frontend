<template>
  <section class="d-flex align-items-center justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Product List</h2>
          <button
              v-if="isAdmin"
              type="button"
              class="btn btn-outline-primary"
              @click="addProduct"
          >
            Add product
          </button>
          <div class="mt-3">
            <input
                type="text"
                v-model="searchTerm"
                placeholder="Search products"
                class="form-control"
            />

            <div class="pagination">
              <button @click="decreaseOffset">Previous</button>
              <button @click="increaseOffset">Next</button>
            </div>

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
          <div class="row mt-3">
            <product-list-item
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                @update="update"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import ProductListItem from "./ProductListItem.vue";
import axios from "@/axios-auth.js";

export default {
  name: "ProductList",
  components: {
    ProductListItem,
  },
  computed: {
    isAdmin() {
      const userStore = useUserStore();
      console.log(userStore.role === 1)
      return userStore.role === 1;
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
      offset: 0,
      limit: 12,
    };
  },
  mounted() {
    this.update();
    this.fetchCategories();
  },
  methods: {
    update() {
        axios.get("/products", {
          params: {
            offset: this.offset,
            limit: this.limit
          }
        })
          .then((result) => {
            console.log(result);
            this.products = result.data;
          })
          .catch((error) => console.log(error));
    },
    fetchCategories() {
      axios.get("/categories")
          .then((result) => {
            console.log(result);
            this.categories = result.data;
          })
          .catch((error) => console.log(error));
    },
    addProduct() {
      this.$router.push({ path: "/createproduct" });
    },
    increaseOffset() {
      this.offset += this.limit;
      this.update();
    },
    decreaseOffset() {
      if (this.offset >= this.limit) {
        this.offset -= this.limit;
      }
      this.update();
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
}

.wide-container {
  max-width: 90%;
}

button {
  width: 150px;
}

input,
select {
  width: 200px;
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