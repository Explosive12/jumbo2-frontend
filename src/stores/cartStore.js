import { defineStore } from "pinia";

export const useCartStore = defineStore("cartstore", {
    state: () => ({
        products: [],
    }),
    getters: {
        getProducts: (state) => state.products,
    },
    actions: {
        addToCart(product, quantity) {
            let productInCart = this.products.find(
                (item) => item.product.id === product.id
            );
            if (productInCart) {
                productInCart.quantity += quantity;
            } else {
                this.products.push({ product: product, quantity: quantity });
            }
            console.log(this.products);
        },
        removeProduct(productId) {
            const index = this.products.findIndex(item => item.product.id === productId);
            if (index !== -1) {
                this.products.splice(index, 1);
            }
        },
        clearCart() {
            this.products = [];
        },
    },
});