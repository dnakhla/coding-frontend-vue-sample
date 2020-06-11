<template>
  <div>
    <div class="gobacklink" v-if="isDetailedView">
      <router-link to="/">
        <div>Go Back</div>
      </router-link>
    </div>
    <div
      :class="{
        card: true,
        detailedview: isDetailedView,
        isList: isList,
      }"
      v-if="poke"
    >
      <div class="detailedBottom" v-if="isDetailedView">
        <span>
          <h2>Weight:</h2>
          <p>{{ poke.weight.minimum }} - {{ poke.weight.maximum }}</p>
        </span>
        <span>
          <h2>Height:</h2>
          <p>{{ poke.height.minimum }} - {{ poke.height.maximum }}</p>
        </span>
        <span>
          <h2>CP:</h2>
          <p>{{ poke.maxCP }}</p>
        </span>
        <span>
          <h2>HP:</h2>
          <p>{{ poke.maxHP }}</p>
        </span>
      </div>
      <div class="top">
        <router-link :to="poke.name">
          <img
            :class="{
              detailedview: isDetailedView,
            }"
            loading="lazy"
            :src="poke.image"
          />
        </router-link>
        <span
          @click="playPokeSound(poke)"
          v-if="isDetailedView"
          className="soundIcon"
        >
          <p>🔊</p>
        </span>
      </div>
      <div
        class="bottom"
        :class="{
          detailedview: isDetailedView,
        }"
      >
        <router-link :to="poke.name">
          <h2>{{ poke.name }}</h2>
        </router-link>
        <button
          class="favButton"
          @click="!poke.isFavorite ? onFav(poke.id) : onRemoveFav(poke.id)"
        >
          {{ poke.isFavorite ? "❤️" : "💔" }}
        </button>
        <p>{{ (poke.types || []).join(", ") }}</p>
      </div>
    </div>
    <div v-if="isDetailedView && poke.evolutions.length > 0">
      <h2 class="title">Evolutions</h2>
      <div class="evoholder">
        <Card
          v-for="(item, index) in poke.evolutions"
          v-bind:poke="item"
          v-bind:key="item.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2.title {
  font-size: 3rem;
}
div.evoholder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
div.gobacklink {
  font-size: 2rem;
  margin: 1rem;
  text-align: center;
  width: 100%;
  font-weight: bold;
  a {
    text-decoration: none;
  }
}
div.card {
  height: 30rem;
  border: 0.5px solid var(--main-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  &.isList {
    display: flex;
    flex-direction: row;
    height: 10rem;
    overflow: hidden;
    img {
      height: auto;
      width: 10rem;
    }
    div.bottom {
      width: 100%;
      border-top: none;
    }
  }
  &.detailedview {
    height: auto;
    flex-direction: column-reverse;
  }
  a {
    margin: auto;
    text-decoration: none;
    display: flex;
  }

  div.detailedBottom {
    padding: 1rem;
    background: #fff;
    border-top: 1px solid var(--main-bg-color);
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    p {
      font-size: 1.4rem;
      font-family: "Courier New", Courier, monospace;
    }
  }
  div.top {
    display: flex;
    height: 100%;
    position: relative;
    span {
      position: absolute;
      bottom: 0;
      right: 0;
      cursor: pointer;
      p {
        margin: 1rem;
        font-size: 5rem;
      }
    }
    img {
      max-width: 80%;
      max-height: 225px;
      margin: auto;
      &.detailedview {
        max-width: auto;
        max-height: 100%;
        margin: 3rem;
      }
    }
  }
  div.bottom {
    padding: 1rem;
    background: var(--grey-color);
    position: relative;
    border-top: 1px solid var(--main-bg-color);
    &.detailedview {
      border-bottom: 1px solid var(--main-bg-color);
      border-top: 0;
    }
    h2 {
      color: var(--primary-color);
      text-transform: uppercase;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 0;
      margin-top: 1rem;
    }
    p {
      font-size: 1.4rem;
      font-family: "Courier New", Courier, monospace;
    }
    button {
      font-size: 2.5rem;
      padding: 1rem;
      background: transparent;
      border: 0;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      right: 0;
      &:active,
      &:focus {
        border: 0;
        outline: 0;
      }
    }
  }
}
</style>

<script>
export default {
  name: "Card",
  props: {
    poke: Object,
    onFav: Function,
    onRemoveFav: Function,
    isDetailedView: Boolean,
    isList: Boolean,
  },
  methods: {
    playPokeSound: (poke) => {
      let audio = new Audio(poke.sound); // path to file
      audio.play();
    },
  },
};
</script>
