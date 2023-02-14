<template>
  <Transition appear>
    <section v-if="shoppingItem" class="item-page">
      <div @click="close" class="item-page__back-btn"></div>
      <h3>{{ shoppingItem.name }}</h3>
      <p>{{ shoppingItem.description }}</p>
    </section>
  </Transition>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      shoppingItem: null,
    };
  },
  async created() {
    const id = this.shoppingItemId;
    if (id) {
      try {
        var shoppingItem = await this.$store.dispatch({type: "getShoppingItemById", shoppingItemId: id});
        this.shoppingItem = shoppingItem;
      } catch (err) {
        console.log("err:", err)
      }
    }
  },
  methods: {
    close() {
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

