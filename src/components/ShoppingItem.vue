<template>
  <tr @click="toggleDoneStatus" class="shopping-list__item" v-if="item" :class="{complete: isItemComplete}">
    <td class="shopping-list__item_idx" @click="openItemPage">
          <div>
        {{ idx }}
          </div>
      <div class="shopping-list__item_idx-border-right"></div>
    </td>
    <td>
      {{ item.name }}
    </td>
    <td>
      {{ `${item.price} NIS` }}
    </td>
    <td class="shopping-list__item_icons">
      <div @click.stop="edit" class="shopping-list__item_icon shopping-list__item_icon-edit"></div>
      <div @click.stop="remove" class="shopping-list__item_icon shopping-list__item_icon-remove"></div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Shopping-list",
  props: {
    item: Array,
    idx: Number
  },
  components: {},
  async created() {
  },
  computed: {
    isItemComplete() {
      return this.$props.item.isComplete
    }
  },
  methods: {
    edit() {
      this.$emit("edit", this.$props.item._id);
    }
    ,remove() {
      this.$emit("remove", this.$props.item._id);
    },
    toggleDoneStatus() {
      this.$emit("toggleDoneStatus", this.$props.item);
    },
    openItemPage() {
      this.$emit("openItemPage", this.$props.item._id);
    },
  }
};
</script>
