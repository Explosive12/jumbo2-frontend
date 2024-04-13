<template>
  <section>
    <div class="container">
      <h1 class="mt-3 mt-lg-5 text-center">Welcome to Jumbo 2 Supermarket</h1>
      <div class="row mt-5">
        <div class="col-lg-4">
          <div class="card">
            <img
              src="https://www.jumbo.com/dam/winkels/foodmarkt/Foodmarkt-afdeling-fruit.jpg"
              class="card-img-top"
              alt="Fresh Produce"
            />
            <div class="card-body">
              <h5 class="card-title">Fresh Produce</h5>
              <p class="card-text">
                Discover our wide range of fresh fruits and vegetables sourced
                from local farms.
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <img
              src="https://www.jumbo.com/dam/inspiratie/sint/Jumbo-Gourmet-Sint-2023-S.jpg"
              class="card-img-top"
              alt="Gourmet Bakery"
            />
            <div class="card-body">
              <h5 class="card-title">Gourmet Bakery</h5>
              <p class="card-text">
                Indulge in our freshly baked breads, decadent cakes, and
                exquisite pastries.
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <img
              src="https://www.jumbo.com/dam/inspiratie/blog/zelfgemaakte-borrelhapjes/Jumbo-Blog-zelfgemaakte-snacks-borrel-Header-L.jpg"
              class="card-img-top"
              alt="Snacks"
            />
            <div class="card-body">
              <h5 class="card-title">Snacks</h5>
              <p class="card-text">
                Satisfy your cravings with our variety of chips, chocolates, and
                other snacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-style">
    <div class="container">
      <h2 class="mt-5 text-center">Our Commitment to Quality</h2>
      <div class="row mt-3">
        <div class="col-lg-6">
          <p>
            At Jumbo 2 Supermarket, we are committed to providing our customers
            with the highest quality products. We source our produce from local
            farms, ensuring freshness and supporting our community. Our gourmet
            bakery items are made in-house daily, using only the finest
            ingredients.
          </p>
        </div>
        <div class="col-lg-6">
          <img
            src="https://content.presspage.com/uploads/2966/2be6abd6-4357-442a-bc00-a29ad1da4a52/1920_jumbo-winkel-eindhoven-2021-44.jpg?10000"
            alt="Quality"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
  <section class="section-style">
    <div class="container">
      <h2 class="mt-5 text-center">Join Our Loyalty Program</h2>
      <div class="row mt-3">
        <div class="col-lg-6">
          <p>
            Sign up for our loyalty program and start earning points on every
            purchase. Redeem your points for discounts, exclusive products, and
            other exciting rewards. Join today and start saving!
          </p>
        </div>
        <div class="col-lg-6">
          <img
            src="https://loyaltyfacts.nl/wp-content/uploads/2020/02/Jumbo-Extras.jpg"
            alt="Loyalty Program"
            class="img-fluid"
          />
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
.section-style {
  background-color: #f8f9fa;
  padding: 30px 0;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section-style h2 {
  color: #333;
  font-weight: bold;
}

.section-style p {
  color: #666;
  line-height: 1.6;
}

.section-style img {
  border-radius: 10px;
}
</style>
