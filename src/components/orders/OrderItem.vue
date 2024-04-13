<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
      <div class="card product-card h-100">
        <div class="card-body">
          <img :src="item.product.image" :alt="item.product.title" :title="item.product.title" />
          <div class="float-start">
            <p>{{ item.product.name }}</p>
            <p>
              <small>{{ item.product.category.name }}</small>
            </p>
          </div>
          <span class="price float-end">{{ item.price }}</span>
        </div>
        <div class="card-footer">
          <button @click="decreaseQuantity(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id)">+</button>
        </div>
      </div>
    </div>
  </template>

<script>

import axios from "../../axios-auth.js";

export default {
  name: "OrderItem",
  props: {
    item: Object,
  },
  methods: {
    decreaseQuantity(id) {
      axios
        .put("/orders/" + id + "/decrease")
        .then((result) => {
          console.log(result);
          this.$emit('update')
        })
        .catch((error) => console.log(error));
    },
    increaseQuantity(id) {
      axios
        .put("/orders/" + id + "/increase")
        .then((result) => {
          console.log(result);
          this.$emit('update')
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>