<template>
  <div id="search">
    <input
      id="namesearch"
      type="text"
      ref="input"
      placeholder="name?"
      @keyup.enter="searchByName"
    />
  </div>
</template>

<style scoped lang="scss">
div {
}
</style>

<script>
export default {
  props: {
    searchterm: String,
  },
  methods: {
    searchByName() {
      this.searchterm = "";
    },
  },
};
</script>
