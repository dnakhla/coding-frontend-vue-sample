<template>
  <div>
    <div id="search">
      <form @submit.prevent="searchByName">
        <input
          id="namesearch"
          type="text"
          v-model="searchterm"
          placeholder="Search by Name"
        />
      </form>
    </div>
    <div id="filter">
      <select @change="searchByType">
        <option value="All">
          All
        </option>
        <option v-for="option in pokeTypes" v-bind:value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div @click="handleListToggle">
      <button :class="{ active: isGrid }">
        Grid
      </button>
      <button :class="{ active: !isGrid }">List</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  width: 50%;
  &.active {
    background: red;
  }
}
</style>

<script>
import { getPokeTypes } from "@/services/graphql-api/api";
export default {
  props: {
    isGrid: Boolean,
    handleSearch: Function,
    handleSearchByType: Function,
    handleListToggle: Function,
  },
  data() {
    return {
      searchterm: "",
      pokeTypes: [],
      onSearchByType: "All",
    };
  },
  async created() {
    try {
      this.pokeTypes = await getPokeTypes();
    } catch (e) {
      throw new Error(e.toString());
    }
  },
  methods: {
    searchByName() {
      this.handleSearch(this.searchterm);
    },
    searchByType(e) {
      let selectedType = e.target.value;

      this.handleSearchByType(selectedType == "All" ? false : selectedType);
    },
  },
};
</script>
