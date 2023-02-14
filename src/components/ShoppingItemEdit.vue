<template>
  <div class="modal-wrapper">
    <Transition appear>
      <section class="item-edit wrapped-modal" v-click-outside="closeModal">
        <div class="item-edit-form__close-btn" @click="closeModal"></div>
        <form v-if="shoppingItemToEdit" @submit.prevent="save" class="item-edit-form">
          <div class="item-edit-form__inputs">
            <input class="item-edit-form__input" type="text" placeholder="Name" v-model="shoppingItemToEdit.name"/>
            <input class="item-edit-form__input" type="price" placeholder="Price" v-model="shoppingItemToEdit.price"/>
          </div>
          <!--        <label>-->
          <!--          Attach to labels?-->
          <!--          <el-select v-model="shoppingItemToEdit.labels">-->
          <!--            <el-option value="Fruits">Fruits</el-option>-->
          <!--            <el-option value="Milk">Milk</el-option>-->
          <!--          </el-select>-->
          <!--        </label>-->
          <el-select v-model="shoppingItemToEdit.labels" multiple>
            <el-option value="Fruits">Fruits</el-option>
            <el-option value="Milk">Milk</el-option>
            <el-option value="Food">Food</el-option>
            <el-option value="Furniture">Furniture</el-option>
            <el-option value="Doll">Doll</el-option>
            <el-option value="Carbohydrates">Carbohydrates</el-option>
          </el-select>
          <textarea class="item-edit-form__textarea" type="text" placeholder="Description" v-model="shoppingItemToEdit.description"/>
          <button class="item-edit-form__save-btn"></button>
        </form>
      </section>
    </Transition>
  </div>
</template>

<script>
import shoppingService from '../services/shopping-service.js';

export default {
  components: {},
  data() {
    return {
      shoppingItemToEdit: null,
    };
  },
  async created() {
    const id = this.shoppingItemId;
    if (id) {
      try {
        var shoppingItem = await this.$store.dispatch({type: "getShoppingItemById", shoppingItemId: id});
        this.shoppingItemToEdit = shoppingItem;
      } catch (err) {
        console.log("err:", err)
      }
    } else {
      this.shoppingItemToEdit = shoppingService.getEmptyShoppingItem()
    }
    ;
  },
  methods: {
    async save() {
      try {
        await this.$store.dispatch({
          type: "saveShoppingItem",
          shoppingItem: this.shoppingItemToEdit
        });
        this.$router.push("/");
      } catch (err) {
      }
    },
    closeModal() {
      this.shoppingItemToEdit = null;
      this.$router.push("/");
    }
  },
  computed: {
    shoppingItemId() {
      return this.$route.params.id;
    },
  }
};
</script>

<style></style>
