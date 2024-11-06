<template>
  <div class="product-item">
    <img :src="product.image" alt="Product Image"/>
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <span>{{ product.price }}</span>
    <button @click="$emit('add-to-basket', product)">Add to Basket</button>
  </div>
</template>

<script>
export default {
  props: ['product']
};
</script>
