<template>
  <div class="container">
    <div class="search">
      <slot name="searchform" />
    </div>

    <slot name="filter" />
    <slot name="grid" />
  </div>
</template>

<style scoped lang="scss">
div.container {
  display: flex;
  margin-bottom: 1rem;
  div {
    display: flex;
    &.search {
      flex: 1 1 100%;
      form {
        width: 100%;
      }
      input {
        width: 100%;
        border: 1px solid var(--faded-bg-color);
        font-size: 1.6rem;
        padding: 0.5rem;
      }
    }
    &.filter {
      select {
        border: 1px solid var(--faded-bg-color);
      }
    }
    &.viewsettings {
      margin-left: 1rem;
      button {
        background: #fff;
        border: none;
        border-bottom: 2px solid #fff;
        &:active,
        &:focus {
          border: 0;
          outline: 0;
        }
        &.active {
          border-bottom: 2px solid var(--primary-color);
        }
      }
    }
  }
}
</style>
