<template>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Create a product</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">Name</span>
          <input type="text" class="form-control" v-model="product.name" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Price</span>
          <input type="number" class="form-control" v-model="product.price" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Description</span>
          <textarea
            class="form-control"
            v-model="product.description"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Image URL</span>
          <input type="text" class="form-control" v-model="product.image" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Stock</span>
          <input type="number" class="form-control" v-model="product.stock" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Category</span>
          <select class="form-select" v-model="product.category_id">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="input-group mt-4">
          <button
            type="button"
            class="btn btn-primary button-spacing"
            @click="addProduct"
          >
            Create product
          </button>
          <button
            type="button"
            class="btn btn-danger mr-3"
            @click="this.$router.push('/products')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import axios from "../../axios-auth.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CreateProduct",
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        image: "",
        stock: "",
        category_id: 0,
      },
      categories: [],
    };
  },
  methods: {
    addProduct() {
      const token = useUserStore().token;
      axios
          .post("/products", this.product, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$router.push("/products");
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
        .get("/categories")
      .then((result) => {
        console.log(result);
        this.categories = result.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
.button-spacing {
  margin-right: 20px;
}
</style>
