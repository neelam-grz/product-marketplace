<template>
  <div class="filters">
    <input
      type="text"
      placeholder="Search for Products, Brands and More"
      @input="updateSearch"
      class="filter-input"
      v-model="searchTerm"
    />
    <select @change="updateFilter" v-model="selectedCategory" class="filter-select">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <button @click="clearFilters" class="clear-button">Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      selectedCategory: '',
      categories: ['Electronics', 'Clothing', 'Accessories'], 
    };
  },
  methods: {
    updateSearch() {
      this.$emit('filter', this.searchTerm);
    },
    updateFilter() {
      this.$emit('filter', this.selectedCategory); 
    },
    clearFilters() {
      this.searchTerm = '';
      this.selectedCategory = '';
      this.$emit('filter', '');
    },
  },
};
</script>

