<template>
  <section>
    <div class="container">
      <h1 class="mt-3 mt-lg-5 text-center">Welcome to Jumbo Supermarket</h1>
      <div class="row mt-5">
        <div class="col-lg-4">
          <div class="card">
            <img src="groceries.jpg" class="card-img-top" alt="Groceries">
            <div class="card-body">
              <h5 class="card-title">Groceries</h5>
              <p class="card-text">Find fresh fruits, vegetables, and all your grocery needs.</p>
              <a href="#" class="btn btn-primary">Shop Groceries</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <img src="bakery.jpg" class="card-img-top" alt="Bakery">
            <div class="card-body">
              <h5 class="card-title">Bakery</h5>
              <p class="card-text">Enjoy our freshly baked breads, cakes, and pastries.</p>
              <a href="#" class="btn btn-primary">Visit Bakery</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <img src="deli.jpg" class="card-img-top" alt="Deli">
            <div class="card-body">
              <h5 class="card-title">Deli</h5>
              <p class="card-text">Choose from a variety of meats, cheeses, and ready-to-eat meals.</p>
              <a href="#" class="btn btn-primary">Explore Deli</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>