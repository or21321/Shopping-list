<template>
  <div class="shopping-list-container full">
    <h1>Shopping-list</h1>
    <ul class="shopping-list" v-if="shoppingList && shoppingList.length">
      <shopping-item v-for="(shoppingItem, idx) of shoppingList"
                     :item="shoppingItem" :idx="idx"
                     @edit="editItem"
                     @remove="removeItem"
                     @toggleDoneStatus="toggleItemDoneStatus"
      ></shopping-item>
    </ul>
    <div v-else>
      No shopping items to show, reload page
    </div>
    <div class="shopping-list__add-button">
      <div>+</div>
      <button @click.stop="openAddItemModal">Add Product</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import shoppingItem from '../components/ShoppingItem.vue'

export default {
  components: {
    shoppingItem
  },
  async created() {
    await this.$store.dispatch({type: "loadShoppingList"});
  },
  computed: {
    shoppingList() {
      return this.$store.getters.shoppingListForDisplay;
    }
  },
  methods: {
    editItem(id) {
      console.log("id:", id)
      this.$router.push('/edit/' + id)
    },
    removeItem(id) {
      console.log("id:", id)
      this.$store.dispatch({type: "removeShoppingItem", id})
    },
    // ** Should use specific action for toggle item, and not send shoppingItem through child component, to store, but to save time implemented this way for now.
    toggleItemDoneStatus(shoppingItem) {
      console.log("shoppingItem:", shoppingItem)
      this.$store.dispatch({type: "toggleShoppingItemDoneStatus", shoppingItem})
    },
    openAddItemModal() {
      this.$router.push('/edit/')
    }
  }
};
</script>
