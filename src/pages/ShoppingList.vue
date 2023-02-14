<template>
  <div class="shopping-list-container full">
    <h1>Shopping-list</h1>
    <ul class="shopping-list" v-if="shoppingList && shoppingList.length">
      <shopping-item v-for="(shoppingItem, idx) of shoppingList"
                     :item="shoppingItem" :idx="idx"
                     @edit="editItem"
                     @remove="removeItem"
                     @toggleDoneStatus="toggleItemDoneStatus"
                     @openItemPage="openItemPage"
      ></shopping-item>
      <li class="shopping-list__item shopping-list__item_sum-prices">
        <div class="shopping-list__item_idx">
          <div>
          </div>
          <div class="shopping-list__item_idx-border-right"></div>
        </div>
        <div>
          Total:
        </div>
        <div>
          {{ `${getAllItemsPriceSum} NIS` }}
        </div>
        <div class="shopping-list__item_icons">
        </div>
    </li>
    </ul>
    <div v-else>
      No shopping items to show, reload page
    </div>
    <div class="shopping-list__add-button">
      <div @click.stop="openAddItemModal">+</div>
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
    },
    getAllItemsPriceSum() {
      return this.$store.getters.getAllItemsPriceSum
    }
  },
  methods: {
    editItem(id) {
      this.$router.push('/edit/' + id)
    },
    removeItem(id) {
      this.$store.dispatch({type: "removeShoppingItem", id})
    },
    // ** Should use specific action for toggle item, and not send shoppingItem through child component, to store, but to save time implemented this way for now.
    toggleItemDoneStatus(shoppingItem) {
      this.$store.dispatch({type: "toggleShoppingItemDoneStatus", shoppingItem})
    },
    openAddItemModal() {
      this.$router.push('/edit/')
    },
    openItemPage(id) {
      this.$router.push(`/${id}`)
    }
  }
};
</script>
