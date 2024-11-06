import { createStore } from 'vuex';

export default createStore({
  state: {
    basket: [],
    products: [],
  },
  mutations: {
    addToBasket(state, product) {
      const item = state.basket.find((item) => item.id === product.id);
      if (item) {
        console.log(item);
        item.quantity += 1;
      } else {
        state.basket.push({ ...product, quantity: 1 });
      }
    },
    updateQuantity(state, { productId, quantity }) {
      const item = state.basket.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity; // Update the quantity
      }
    },
    removeFromBasket(state, productId) {
      state.basket = state.basket.filter((item) => item.id !== productId);
    },
    clearBasket(state) {
      state.basket = [];
    },
    setProducts(state, products) {
      state.products = products;  // Set the products in the state
    },
  },
  actions: {
    addToBasket({ commit }, product) {
      commit('addToBasket', product);
    },
    updateQuantity({ commit }, { productId, quantity }) {
      commit('updateQuantity', { productId, quantity });
    },
    removeFromBasket({ commit }, productId) {
      commit('removeFromBasket', productId);
    },
    clearBasket({ commit }) {
      commit('clearBasket');
    },
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        commit('setProducts', data.products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
  getters: {
    basket(state) {
      return state.basket;
    },
    totalPrice(state) {
      return state.basket.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    products(state) {
      return state.products;
    },
    itemCount(state) {
      return state.basket.reduce((total, item) => total + item.quantity, 0);
    },
    uniqueBrands(state) {
      const brands = new Set();  
      state.products.forEach(product => {
        if (product.brand) { 
          brands.add(product.brand);
        }
      });
      return [...brands];
    },
  
  },
});
