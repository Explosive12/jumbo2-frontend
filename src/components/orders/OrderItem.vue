<template>
  <tr>
    <td>{{ item.product.name }}</td>
    <td>{{ item.quantity }}</td>
    <td>{{ formatPrice(item.product.price) }}</td>
    <td>{{ formatPrice(item.product.price * item.quantity) }}</td>
    <td>
      <button class="btn btn-danger" @click="handleRemove">
        Remove
      </button>
    </td>
  </tr>
</template>

<script>
import {useCartStore} from "@/stores/cartStore";

export default {
  props: {
    item: {
      type: Object,
      required: true,
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
    handleRemove() {
      this.$emit('remove', this.item.product.id);
    },
  },
};
</script>