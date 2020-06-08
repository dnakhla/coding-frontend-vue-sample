<template>
  <div class="home">
    <Header />
    <FilterOptions :searchterm="searchTerm" />
    <CardsListView :list="list" />
  </div>
</template>

<script>
import { Header, FilterOptions, CardsListView } from "@/components/";
import { getPokes } from "@/services/graphql-api/api";
export default {
  name: "app",
  data() {
    return {
      searchTerm: "",
      list: [],
    };
  },
  async created() {
    try {
      this.list = await getPokes(10, 0);
    } catch (e) {
      console.error(e);
    }
  },
  components: {
    Header,
    FilterOptions,
    CardsListView,
  },
};
</script>
