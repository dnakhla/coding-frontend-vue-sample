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
div {
  margin-bottom: 1rem;
  button {
    width: 50%;
    height: 5rem;
    color: #000;
    background: #fff;
    border: 1px solid #10314a55;
    font-size: 1.4rem;
    font-weight: bold;
    &.active {
      background: var(--main-bg-color);
      border: none;
      color: #fff;
    }
  }
}
</style>
