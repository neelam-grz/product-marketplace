<template>
  <div class="product-market">
    <!-- Dummy Header Section -->
    <header class="header">
      <div class="navbar">
        <!-- Logo -->
        <div class="logo">
          <h1>VENIA</h1>
        </div>

        <!-- Navigation Links -->
        <nav class="nav-links">
          <a href="#">Tops</a>
          <a href="#">Bottoms</a>
          <a href="#">Dresses</a>
          <a href="#">Accessories</a>
          <a href="#">Shop The Look</a>
          <a href="#">New Products</a>
        </nav>

        <!-- Icons Section -->
        <div class="icons">
          <span class="icon">🔍 Search</span>
          <span class="icon">👤 Sign In</span>
          <span @click="toggleCart" class="icon cart-icon">
            🛒
            <span v-if="itemCount > 0" class="item-count">{{ itemCount }}</span>
          </span>
          <div v-if="popupVisible" class="popup-message">
            {{ popupMessage }}
          </div>
        </div>
      </div>
    </header>

    <!-- Search and Filter Section -->
    <div class="search-filter-container">
      <input type="text" v-model="searchQuery" placeholder="Search for Products, Brands and More" class="search-bar" @click="applySearch"/>
      <!-- Search Button -->
      <button @click="applySearch" class="search-btn">
        <i class="fas fa-search"></i> Search again
      </button>
      <!-- Filters Button -->
      <button @click="toggleFilters" class="filter-btn"><i class="fas fa-sliders-h"></i> Filters</button>
      <select v-model="sortOption" @change="applySort" class="sort-dropdown">
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>

    <!-- Filters Dropdown (Conditionally shown) -->
    <div v-if="showFilters" class="filters-modal">
      <div class="modal-content">
        <span class="close close-filters" @click="toggleFilters">×</span>
        <h2>All Filters</h2>

        <div class="accordion">
          <button class="accordion-btn" @click="toggleCategoryAccordion">
            <h3>Categories</h3>
          </button>
          <div v-show="categoryAccordionOpen" class="accordion-content">
            <label v-for="category in categories" :key="category.value" class="category-checkbox">
              <input type="checkbox" :value="category.value" v-model="selectedCategory" @change="applyFilters" />
              {{ category.label }}
            </label>
          </div>
        </div>

        <!-- Brand Accordion -->
        <div class="accordion">
          <button class="accordion-btn" @click="toggleBrandAccordion">
            <h3>Brands</h3>
          </button>
          <div v-show="brandAccordionOpen" class="accordion-content">
            <label v-for="brand in uniqueBrands" :key="brand" class="brand-checkbox">
              <input type="checkbox" :value="brand" v-model="selectedBrand" @change="applyFilters" />
              {{ brand }}
            </label>
          </div>
        </div>
      </div>
      <div class="anchor-wrap">
          <button class="clear" @click="clearAllFilters">Clear All</button>
          <button class="apply">Apply</button>
      </div>
    </div>

    <!-- Showing X results text -->
    <p class="results-text">
      Showing <b>{{ paginatedProducts.length }}</b> results for
      <b>"{{ searchQuery ? searchQuery : 'All Products' }}"</b>
    </p>

    <!-- Product List -->
    <div class="products">
      <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product"
        @add-to-basket="addToBasket" />
    </div>

    <!-- Pagination Component -->
    <Pagination :total-items="filteredProducts.length" :items-per-page="itemsPerPage" @page-changed="onPageChange" />

    <!-- Shopping Cart (Conditionally Show) -->
    <div v-if="showCart" class="cart-overlay" @click.self="toggleCart">
      <ShoppingCart :basket="basket" :totalPrice="totalPrice" @remove-from-basket="removeFromBasket"
        @clear-basket="clearBasket" @update-quantity="updateQuantity" @close-modal="toggleCart" />
    </div>
  </div>
</template>


<script>
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../components/ProductPagination.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import { mapGetters } from "vuex";

export default {
  components: { ProductCard, Pagination, ShoppingCart },
  data() {
    return {
      searchQuery: "",
      showCart: false,
      currentPage: 1,
      itemsPerPage: 9,
      selectedCategory: [],
      selectedBrand: [],
      sortOption: "",
      showFilters: false,
      popupVisible: false,
      categories: [
        { value: "beauty", label: "Beauty" },
        { value: "dresses", label: "Dresses" },
        { value: "fragrances", label: "Fragrances" },
        { value: "furniture", label: "Furniture" }
      ],
      categoryAccordionOpen: false,
      brandAccordionOpen: false
    };
  },
  computed: {
    ...mapGetters(["products", "basket", "totalPrice", "uniqueBrands"]),

    // New computed property for item count in the basket
    itemCount() {
      return this.basket.reduce((total, item) => total + item.quantity, 0);
    },

    // Filtered products based on search query and filters
    filteredProducts() {
      let filtered = this.products;
     
      // Apply search query filter for title and tags
      if (this.searchQuery) {
        console.log(this.searchQuery);
        const searchLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchLower)
        );
        console.log(filtered);
      }

      // Apply category filter - check if the product's category is in the selected categories array
      if (this.selectedCategory.length > 0) {
        filtered = filtered.filter((product) =>
          this.selectedCategory.includes(product.category)
        );
      }
      if (this.selectedBrand.length > 0) {
        filtered = filtered.filter((product) =>
          this.selectedBrand.includes(product.brand)
        );
      }
      return filtered;
    },


    // Sorted and paginated products
    paginatedProducts() {
      let products = [...this.filteredProducts];

      // Apply sorting based on the selected option
      if (this.sortOption) {
        switch (this.sortOption) {
          case "price-asc":
            products.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            products.sort((a, b) => b.price - a.price);
            break;
          case "rating-asc":
            products.sort((a, b) => a.rating - b.rating);
            break;
          case "rating-desc":
            products.sort((a, b) => b.rating - a.rating);
            break;
          case "name-asc":
            products.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "name-desc":
            products.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            break;
        }
      }

      const start = (this.currentPage - 1) * this.itemsPerPage;
      return products.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    clearAllFilters() {
    this.selectedCategory = [];
    this.selectedBrand = [];
    this.applyFilters();
  },
    applySearch() {
      this.currentPage = 1;
    },
    applyFilters() {
      this.currentPage = 1;
    },
    applySort() {
      this.currentPage = 1;
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    addToBasket(product) {
      this.$store.dispatch("addToBasket", product);
      this.showPopupMessage(`Item added to Cart`);
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    removeFromBasket(productId) {
      this.$store.dispatch("removeFromBasket", productId);
    },
    updateQuantity(productId, quantity) {
      this.$store.dispatch("updateQuantity", { productId, quantity });
    },
    clearBasket() {
      this.$store.dispatch("clearBasket");
    },
    toggleCategoryAccordion() {
      this.categoryAccordionOpen = !this.categoryAccordionOpen;
    },

    toggleBrandAccordion() {
      this.brandAccordionOpen = !this.brandAccordionOpen;
    },

    showPopupMessage(message) {
      this.popupMessage = message;
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
      }, 1000);
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>
