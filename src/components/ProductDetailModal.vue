<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <span @click="close" class="close-button">&times;</span>
      <h2>{{ product.name }}</h2>
      <img :src="product.image" alt="Product Image" class="product-image"/>
      <p>{{ product.description }}</p>
      <p class="product-price">Price: ${{ product.price }}</p>
      <button @click="addToBasket(product)" class="add-to-basket-button">Add to Basket</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'isOpen'],
  methods: {
    close() {
      this.$emit('close');
    },
    addToBasket(product) {
      this.$store.dispatch('addToBasket', product);
    }
  }
};
</script>
