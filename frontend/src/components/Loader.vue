<template>
  <transition name="fade">
    <div class="isLoading">
      <span>
        <p>Loading...</p>
        <img src="/ball.png" alt="loading" />
      </span>
    </div>
  </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
div.isLoading {
  width: 100%;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
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

<script>
export const isLoadingMixin = {
  data() {
    return {
      state: {
        isLoading: true
      }
    };
  },
  methods: {
    updateIsLoading: function(isLoading) {
      this.state.isLoading = isLoading;
    }
  }
};
export default {};
</script>
