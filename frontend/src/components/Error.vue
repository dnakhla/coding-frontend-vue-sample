<template>
  <div class="isError" @click.prevent="tryAgainHandler">
    <span>
      <p>Something went wrong!</p>
      <code>
        {{ errorMsg || "Unkown Error" }}
      </code>
      <p>Click to refresh page to try again</p>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    errorMsg: String,
    tryAgainHandler: Function,
  },
};
</script>
<style scoped lang="scss">
div.isError {
  width: 100%;
  height: 100vh;
  display: flex;
  span {
    border: 1px solid lightcoral;
    padding: 2rem;
    margin: auto;
    text-align: center;
    cursor: pointer;
    p {
      &:nth-child(1) {
        font-size: 4rem;
      }
      &:last-child {
        font-size: 2rem;
      }
    }

    small {
      display: block;
    }
    code {
      background: lightcoral;
      font-size: 3rem;
      padding: 1rem;
    }
  }
}
</style>
