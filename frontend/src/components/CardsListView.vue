<template>
  <div>
    <ul id="example-1">
      <div v-if="(list || []).length == 0">
        <span>0 results</span>
      </div>
      <li v-for="poke in list" :key="poke.id">
        <router-link :to="poke.name">
          <div>
            <img loading="lazy" :src="poke.image" style="width:100px" />
            {{ poke.name }}
            <p>fav:{{ poke.isFavorite }}</p>
            <p>types:{{ poke.types }}</p>
          </div>
        </router-link>
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
