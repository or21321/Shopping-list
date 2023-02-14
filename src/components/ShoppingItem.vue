<template>
  <tr @click="toggleDoneStatus" class="shopping-list__item" v-if="item" :class="{complete: isItemComplete}">
    <td class="shopping-list__item_idx" @click="openItemPage">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="Go to item page"
          placement="top"
      >
        <div>
          {{ idx }}
        </div>
      </el-tooltip>
      <div class="shopping-list__item_idx-border-right"></div>
    </td>
    <td>
      {{ item.name }}
    </td>
    <td>
      {{ `${item.price} NIS` }}
    </td>
    <td class="shopping-list__item_icons">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="Edit"
          placement="top"
      >
        <div @click.stop="edit" class="shopping-list__item_icon shopping-list__item_icon-edit"></div>
      </el-tooltip>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="Remove"
          placement="top"
      >
        <div @click.stop="remove" class="shopping-list__item_icon shopping-list__item_icon-remove"></div>
      </el-tooltip>
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
    , remove() {
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
