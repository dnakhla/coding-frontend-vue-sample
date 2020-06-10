<template>
  <div>
    <h2>List</h2>
    <ul id="example-1">
      <li v-for="poke in list" :key="poke.id">
        <div>
          <img loading="lazy" :src="poke.image" style="width:100px" />
          {{ poke.name }}
          <p>fav:{{ poke.isFavorite }}</p>
          <p>types:{{ poke.types }}</p>
        </div>
      </li>
      <li>
        <div v-if="allLoaded">
          <p>No more Pokes to show</p>
        </div>
        <div v-if="!allLoaded">
          <p>Checking for more Pokemons</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  display: grid;
  grid-template-columns: auto auto auto;
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
    allLoaded: Boolean,
  },
};
</script>
