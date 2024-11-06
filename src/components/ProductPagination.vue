<template>
  <div class="pagination no-record">
    <!-- Show "No records to show" if there are no items -->
    <div v-if="totalItems === 0" class="no-records">
      No records to show
    </div>

    <!-- Otherwise, show the pagination controls -->
    <div v-else>
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1 || totalPages === 1" 
        class="page-button"
      >
        Previous
      </button>

      <span v-if="totalPages === 1">1 of 1</span>
      <span v-else>Page {{ currentPage }} of {{ totalPages }}</span>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages || totalPages === 1" 
        class="page-button"
      >
        Next
      </button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit('page-changed', this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$emit('page-changed', this.currentPage);
      }
    },
  },
};
</script>


