<template>
  <div class="home">
    <Header :tab="tab" :handleToggle="toggleMainTab" />
    <FilterOptions
      :isGrid="isGrid"
      :handleSearchByType="onSearchByType"
      :handleSearch="onSearch"
      :handleListToggle="onListToggle"
    />
    <transition name="slide" mode="out-in" appear>
      <CardsListView
        @scroll="handleScroll"
        :list="list"
        :allLoaded="allLoaded"
      />
    </transition>
  </div>
</template>

<script>
const NEW_CALL_COUNT = 18;
import { Header, FilterOptions, CardsListView } from "@/components/";
import { getPokes, getFavorites } from "@/services/graphql-api/api";
import { useIsScrolledToBottom } from "@/util";

export default {
  name: "app",
  data() {
    return {
      tab: "all",
      searchquery: false,
      isGrid: true,
      typequery: false,
      pageindex: 0,
      list: null,
      allLoaded: false,
    };
  },
  async created() {
    try {
      this.list = await this.runQuery();
      //load more on scroll
      window.addEventListener("scroll", this.handleScroll);
    } catch (e) {
      throw new Error(e.toString());
    }
  },
  watch: {
    tab: async function(val) {
      this.pageindex = 0;
      this.list = this.runQuery();
    },
    searchTerm: function(val) {
      console.log(val);
    },
  },
  methods: {
    runQuery: async function() {
      return await getPokes({
        limit: NEW_CALL_COUNT,
        offset: this.pageindex,
        isSearch: this.searchquery,
        isType: this.typequery,
        isFavorites: this.tab == "favorites",
      });
    },
    onListToggle: async function() {
      this.isGrid = !this.isGrid;
    },
    onSearchByType: async function(selected) {
      this.pageindex = 0;
      this.typequery = selected;
      this.list = await this.runQuery();
    },
    onSearch: async function(x) {
      this.pageindex = 0;
      this.searchquery = x;
      this.list = await this.runQuery();
    },
    //@TOOD turn to mixin
    toggleMainTab: async function() {
      this.tab = this.tab == "all" ? "favorites" : "all";
    },
    handleScroll: async function() {
      // need to debounce this
      let bottomOfWindow = useIsScrolledToBottom(window);
      if (bottomOfWindow) {
        try {
          this.pageindex = this.pageindex + NEW_CALL_COUNT;
          let newData = await this.runQuery();
          //if we have more pokes lets add them
          if (newData.length > 0) {
            let newState = [...this.list, ...newData];
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
