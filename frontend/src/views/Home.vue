<template>
  <div class="home">
    <Header />
    <FilterOptions :searchterm="searchTerm" />
    <CardsListView @scroll="handleScroll" :list="list" :allLoaded="allLoaded" />
  </div>
</template>

<script>
const NEW_CALL_COUNT = 18;
import { Header, FilterOptions, CardsListView } from "@/components/";
import { getPokes } from "@/services/graphql-api/api";
import { useIsScrolledToBottom } from "@/util";

export default {
  name: "app",
  data() {
    return {
      searchTerm: "",
      pageindex: 0,
      tab: "all",
      list: null,
      allLoaded: false,
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
      let bottomOfWindow = useIsScrolledToBottom(window);
      if (bottomOfWindow) {
        try {
          this.pageindex = this.pageindex + NEW_CALL_COUNT;
          let newData = await getPokes(NEW_CALL_COUNT, this.pageindex);
          //if we have more pokes lets add them
          if (newData.length > 0) {
            let newState = new Set([...this.list, ...newData]);
            this.list = [...newState];
          } else {
            //if no data lets stop listening to the scroll
            this.allLoaded = true;
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
