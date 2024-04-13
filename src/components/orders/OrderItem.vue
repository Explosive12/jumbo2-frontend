<template>
  <tr>
    <td>{{ item.product.name }}</td>
    <td>{{ item.quantity }}</td>
    <td>{{ formatPrice(item.product.price) }}</td>
    <td>{{ formatPrice(item.product.price * item.quantity) }}</td>
    <td>
      <button class="btn btn-danger" @click="removeFromCart(item.product.id)">
        Remove
      </button>
    </td>
  </tr>
</template>

<script>
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
    removeFromCart(id) {
      this.$store.dispatch("removeProduct", id);
    },
  },
};
</script>
