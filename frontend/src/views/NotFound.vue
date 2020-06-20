<template>
  <div>
    <span>
      <h1>404</h1>
      <router-link to="/">
        Go To Home
      </router-link>
    </span>
  </div>
</template>

<style lang="scss" scoped>
div {
  height: 100vh;
  width: 100%;
  display: flex;
  span {
    margin: auto;
    padding: 0;
    font-size: 4rem;
    text-align: center;
    a {
      font-size: 2rem;
    }
  }
}
</style>
