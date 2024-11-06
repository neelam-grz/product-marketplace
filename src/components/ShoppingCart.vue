<template>
  <div class="shopping-cart">
    <button class="close-btn" @click="closeCart">×</button>
    <h2>Your Cart </h2>
    <!-- Cart and Order Summary Container -->
    <div class="cart-container">
      <!-- Cart Items -->
      <ul class="cart-items">
        <!-- Product Summary Header -->
        <li class="cart-summary-header">
          <div class="summary-label product-label">Product</div>
          <div class="summary-label price-label">Price</div>
          <div class="summary-label quantity-label">Quantity</div>
          <div class="summary-label total-label">Total</div>
        </li>

        <!-- Cart Items List -->
        <li v-for="item in basket" :key="item.id" class="cart-item">
          <img :src="item.thumbnail" alt="Product Image" class="product-img" />
          <p class="product-name">{{ item.title }}</p>
          <div class="item-details">
            <p class="product-price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-quantity">
         <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
          <input type="text" v-model="item.quantity" readonly />
          <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>

        </div>
          <p class="total-price">${{ (item.quantity * item.price).toFixed(2) }}</p>
          <button @click="removeFromBasket(item.id)" class="remove-btn">×</button>
        </li>
      </ul>

      <!-- Order Summary Section -->
      <div class="order-summary">
        <p>Subtotal: ${{ totalPrice.toFixed(2) }}</p>
        <p>Shipping: Free</p>
        <p><a href="#">Add coupon code</a></p>
        <h3>Total: ${{ totalPrice.toFixed(2) }}</h3>
        <button class="checkout-btn">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    basket: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
  },
  methods: {
    removeFromBasket(productId) {
      this.$emit('remove-from-basket', productId);
    },
    updateQuantity(productId, quantity) {
      if (quantity > 0) {
        this.$store.dispatch('updateQuantity', { productId, quantity });
      }
    },
    closeCart() {
      this.$emit('close-modal');
    },
  },
};
</script>

