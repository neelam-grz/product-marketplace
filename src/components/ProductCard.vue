<template>
  <div class="product-card">
    <img :src="product.images[0]" alt="Product Image" v-if="product.images[0]" class="product-img" />
    <p class="product-title">{{ product.title }}</p>
    <p class="product-price">${{ product.price.toFixed(2) }}</p>
    <div class="add-to-cart">
      <button @click="addToBasket" class="cart-button">Add to Cart</button>
      <span>
      <svg @click="toggleClass" :class="{ 'active': isActive }" width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    console.log('Product Image URL:', this.product);
  },
  methods: {
    addToBasket() {
      this.$emit('add-to-basket', this.product);
    },
    toggleClass() {
      this.isActive = !this.isActive;
    }
  },
};

</script>

