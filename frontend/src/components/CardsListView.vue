<template>
  <div>
    <ul :class="{ isList: !isGrid }">
      <div class="noResults" v-if="(list || []).length == 0">
        <span>0 results</span>
      </div>
      <li v-for="poke in list" :key="poke.id">
        <Card
          :isList="!isGrid"
          :onFav="onFav"
          :onRemoveFav="onRemoveFav"
          :poke="poke"
        />
      </li>
      <li v-if="allLoaded">
        <div class="nomore">
          <div>
            <p>
              End of List
            </p>
          </div>
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
  grid-gap: 1rem;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  div.noResults {
    font-size: 2rem;
  }
  &.isList {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 100%;
    }
  }
  li {
    div.nomore {
      display: flex;
      height: 100%;
      div {
        margin: auto;
        font-size: 1.6rem;
      }
    }
  }
}
</style>

<script>
import Card from "./Card";
export default {
  components: {
    Card
  },
  props: {
    list: Array,
    isGrid: Boolean,
    allLoaded: Boolean,
    onFav: Function,
    onRemoveFav: Function
  }
};
</script>
