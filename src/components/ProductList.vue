<template>
  <div class="product-list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-basket="addToBasket"
    />
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
  methods: {
    addToBasket(product) {
      this.$store.commit('ADD_TO_BASKET', product);
    }
  }
};
</script>
