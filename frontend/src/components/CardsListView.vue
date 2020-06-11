<template>
  <div>
    <ul :class="{ isList: !isGrid }">
      <div v-if="(list || []).length == 0">
        <span>0 results</span>
      </div>
      <li v-for="poke in list" :key="poke.id">
        <div>
          <router-link :to="poke.name">
            <img loading="lazy" :src="poke.image" style="width:100px" />
          </router-link>
          {{ poke.name }}
          <button
            @click="!poke.isFavorite ? onFav(poke.id) : onRemoveFav(poke.id)"
          >
            fav:{{ poke.isFavorite ? "❤️" : "💔" }}
          </button>
          <p>{{ poke.id }}</p>
          <p>types:{{ poke.types }}</p>
        </div>
      </li>
      <li v-if="allLoaded">
        <div>
          <span>No more Pokes to show</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: auto auto auto;
  &.isList {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: grid;
    width: 100%;
    border: 1px solid saddlebrown;
    div {
      padding: 2rem;
    }
  }
}
</style>

<script>
export default {
  props: {
    list: Array,
    isGrid: Boolean,
    allLoaded: Boolean,
    onFav: Function,
    onRemoveFav: Function,
  },
};
</script>
