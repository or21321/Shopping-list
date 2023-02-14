<template>
  <div class="shopping-list-container">
    <h1>Shopping-list</h1>
    <ul class="shopping-list" v-if="shoppingList && shoppingList.length">
      <li v-for="(shoppingItem, idx) of shoppingList">
        <shopping-item :item="shoppingItem" :idx="idx"></shopping-item>
      </li>
    </ul>
  </div>
</template>

<script>
import shoppingItem from '../components/ShoppingItem.vue'
export default {
  components: {
    shoppingItem
  },
  async created() {
    await this.$store.dispatch({ type: "loadShoppingList"});
  },
  computed: {
    shoppingList() {
      return this.$store.getters.shoppingListForDisplay;
    }
  }
};
</script>
