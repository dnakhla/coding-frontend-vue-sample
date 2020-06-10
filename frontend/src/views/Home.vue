<template>
  <div class="home">
    <Header />
    <FilterOptions :searchterm="searchTerm" />
    <CardsListView @scroll="handleScroll" :list="list" />
  </div>
</template>

<script>
import { Header, FilterOptions, CardsListView } from "@/components/";
import { getPokes } from "@/services/graphql-api/api";
const NEW_CALL_COUNT = 18;
export default {
  name: "app",
  data() {
    return {
      searchTerm: "",
      pageindex: 0,
      list: null,
    };
  },
  async created() {
    try {
      window.addEventListener("scroll", this.handleScroll);
      this.list = await getPokes(NEW_CALL_COUNT, this.pageindex);
    } catch (e) {
      throw new Error(e.toString());
    }
  },
  methods: {
    //@TOOD turn to mixin
    handleScroll: async function() {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        try {
          this.pageindex = this.pageindex + NEW_CALL_COUNT;
          let newData = await getPokes(NEW_CALL_COUNT, this.pageindex);
          if (newData.length > 0) {
            let newState = new Set([...this.list, ...newData]);
            this.list = [...newState];
          } else {
            window.removeEventListener("scroll", this.handleScroll);
          }
        } catch (e) {
          console.error(e.toString());
        }
      }
    },
  },
  components: {
    Header,
    FilterOptions,
    CardsListView,
  },
};
</script>
