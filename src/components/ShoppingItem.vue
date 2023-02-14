<template>
      <li class="shopping-list__item" v-if="item">
        <div>
        {{idx}}
        </div>
        <div>
        {{item.name}}
        </div>
        <div>
        {{`${item.price} NIS`}}
        </div>
        <div class="shopping-list__item_icons">
          <div class="shopping-list__item_icon shopping-list__item_icon-edit"></div>
          <div class="shopping-list__item_icon shopping-list__item_icon-remove"></div>
        </div>
      </li>
</template>

<script>
export default {
  name: "Shopping-list",
  props: {
    item: Array,
    idx: Number
  },
  components: {
  },
  async created() {
  }
};
</script>
