<template>
  <div class="isLoading">
    <span>
      <p>Loading...</p>
      <img src="/ball.png" alt="loading" />
    </span>
  </div>
</template>

<style scoped lang="scss">
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
div.isLoading {
  width: 100%;
  height: 100vh;
  display: flex;
  span {
    margin: auto;
    text-align: center;
    p {
      font-size: 2rem;
      margin: 0;
    }
    img {
      margin: 0;
      animation: spin 1s linear infinite;
    }
  }
}
</style>
