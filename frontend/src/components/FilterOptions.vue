<template>
  <div class="container">
    <div class="search">
      <form @submit.prevent="searchByName">
        <input
          id="namesearch"
          type="text"
          v-model="searchterm"
          placeholder="Search by Name"
        />
      </form>
    </div>
    <div class="filter">
      <select @change="searchByType">
        <option value="All">
          All
        </option>
        <option
          v-for="(option, index) in pokeTypes"
          :key="`key-${index}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="viewsettings" @click="handleListToggle">
      <button :class="{ active: isGrid }">
        Grid
      </button>
      <button :class="{ active: !isGrid }">List</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.container {
  display: flex;
  margin-bottom: 1rem;
  div {
    display: flex;
    &.search {
      flex: 1 1 100%;
      form {
        width: 100%;
      }
      input {
        width: 100%;
        border: 1px solid var(--faded-bg-color);
        font-size: 1.6rem;
        padding: 0.5rem;
      }
    }
    &.filter {
      select {
        border: 1px solid var(--faded-bg-color);
      }
    }
    &.viewsettings {
      margin-left: 1rem;
      button {
        background: #fff;
        border: none;
        border-bottom: 2px solid #fff;
        &:active,
        &:focus {
          border: 0;
          outline: 0;
        }
        &.active {
          border-bottom: 2px solid var(--primary-color);
        }
      }
    }
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
    handleListToggle: Function
  },
  data() {
    return {
      searchterm: "",
      pokeTypes: [],
      onSearchByType: "All"
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
    }
  }
};
</script>
