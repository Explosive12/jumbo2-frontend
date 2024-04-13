<template>
    <div> 
        <h2>Cart</h2>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cart" :key="item.id">
                                    <td>{{ item.product.name }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.product.price }}</td>
                                    <td>{{ item.product.price * item.quantity }}</td>
                                    <td>
                                        <button class="btn btn-danger" @click="removeFromCart(item.id)">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-end">
                            <h4>Total: {{ total }}</h4>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-primary" @click="checkout">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "../../axios-auth.js";


export default {
  name: "App",
  components: {
    Navigation
  }, 
  data() {
    return {
      cart: [],
      total: 0,
      errormessage: ''
    };
  },
};
</script>