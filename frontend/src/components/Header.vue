<template>
  <div @click="handleToggle">
    <button :class="{ active: tab == 'all' }">
      All
    </button>
    <button :class="{ active: tab == 'favorites' }">
      Favorites
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tab: String,
    handleToggle: Function,
  },
};
</script>
<style scoped lang="scss">
button {
  width: 50%;
  &.active {
    background: red;
  }
}
</style>
