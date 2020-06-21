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
export const errorStateMixin = {
  data() {
    return {
      state: {
        errorMsg: false
      }
    };
  },
  beforeUpdate() {
    if (this.$route.query.redirecturl && !this.state.errorMsg) {
      this.$router.push({
        path: this.$route.query.redirecturl
      });
    }
  },
  methods: {
    updateErrMessage: function(message) {
      this.state.errorMsg = message;
    },
    defaultErrPageHandler: function() {
      setTimeout(() => {
        this.$router.go();
      }, 100);
    }
  }
};

export default {
  props: {
    errorMsg: String,
    tryAgainHandler: Function
  }
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
      line-height: 4rem;
      padding: 1rem;
    }
  }
}
</style>
