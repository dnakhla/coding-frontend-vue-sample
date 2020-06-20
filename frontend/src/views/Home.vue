<template>
  <div class="home">
    <Loader v-if="isLoading" />
    <Error
      v-if="!isLoading && errorMsg"
      :errorMsg="errorMsg"
      :tryAgainHandler="refreshPage"
    />
    <div v-if="!isLoading && !errorMsg">
      <Header :tab="tab" :handleToggle="toggleMainTab" />
      <FilterOptions
        :isGrid="isGrid"
        :handleSearchByType="onSearchByType"
        :handleSearch="onSearch"
        :handleListToggle="onListToggle"
      />
      <CardsListView
        :isGrid="isGrid"
        :list="list"
        :allLoaded="allLoaded"
        :onFav="handleFav"
        :onRemoveFav="handleRemoveFav"
      />
      <button v-if="!allLoaded" id="loadmore">
        Load more
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
button#loadmore {
  width: 100%;
}
</style>

<script>
const NEW_CALL_COUNT = 3;
import {
  Header,
  FilterOptions,
  CardsListView,
  Loader,
  Error,
} from "@/components/";
import {
  getPokes,
  favoritePoke,
  removeFavoritePoke,
  getPokeByID,
} from "@/services/graphql-api/api";
import { isInViewport } from "@/util";

export default {
  name: "app",
  data() {
    return {
      isLoading: true,
      errorMsg: false,
      tab: "all",
      searchquery: false,
      isGrid: true,
      typequery: false,
      pageindex: 0,
      list: null,
      allLoaded: false,
    };
  },
  beforeUpdate() {
    if (this.$route.query.redirecturl && !this.errorMsg) {
      this.$router.push({
        path: this.$route.query.redirecturl,
      });
    }
  },
  async mounted() {
    if (this.$route.query.errorMsg) {
      this.isLoading = false;
      this.errorMsg = this.$route.query.errorMsg;
      return;
    }
    try {
      this.list = await this.runQuery();
      //load more on scroll
      this.isLoading = false;
      window.addEventListener("scroll", this.handleScroll);
    } catch (e) {
      this.isLoading = false;
      this.errorMsg = e.toString();
    }
  },

  watch: {
    tab: async function() {
      this.pageindex = 0;
      this.allLoaded = false;
      this.list = await this.runQuery();
    },
    list: function() {
      setTimeout(async () => {
        await this.loadMore();
      }, 0);
    },
  },
  methods: {
    refreshPage: function() {
      this.isLoading = true;
      this.errorMsg = false;
      setTimeout(() => {
        this.$router.go();
      }, 100);
    },

    runQuery: async function() {
      let opts = {
        limit: NEW_CALL_COUNT,
        offset: this.pageindex,
        isSearch: this.searchquery,
        isType: this.typequery,
        isFavorites: this.tab == "favorites",
      };
      console.log(opts);
      return await getPokes(opts);
    },
    onListToggle: async function() {
      this.isGrid = !this.isGrid;
    },
    onSearchByType: async function(selected) {
      this.pageindex = 0;
      this.typequery = selected;
      this.list = await this.runQuery();
    },
    onSearch: async function(searchquery) {
      this.pageindex = 0;
      this.searchquery = searchquery;
      this.list = await this.runQuery();
    },
    //@TOOD turn to mixin
    toggleMainTab: async function() {
      this.tab = this.tab == "all" ? "favorites" : "all";
    },
    handleFav: async function(pokeId) {
      await favoritePoke(pokeId);
      let updatedPoke = await getPokeByID(pokeId);
      this.replacePokeInListWithUpdate(updatedPoke);
    },
    handleRemoveFav: async function(pokeId) {
      await removeFavoritePoke(pokeId);
      let updatedPoke = await getPokeByID(pokeId);
      this.replacePokeInListWithUpdate(updatedPoke);
    },
    replacePokeInListWithUpdate: function(pokeOb) {
      this.list = this.list.map((x) => {
        if (x.id == pokeOb.id) {
          x = pokeOb;
        }
        return x;
      });
    },
    loadMore: async function() {
      var loadMoreButton = document.getElementById("loadmore");
      let bottomOfWindow = false;
      if (loadMoreButton) bottomOfWindow = isInViewport(loadMoreButton);
      if (bottomOfWindow) {
        try {
          this.pageindex = this.pageindex + NEW_CALL_COUNT;
          let newData = await this.runQuery();
          //if we have more pokes lets add them
          if (newData.length > 0) {
            this.list = [...this.list, ...newData];
            await this.loadMore();
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
    handleScroll: async function() {
      // need to debounce this
      await this.loadMore();
    },
  },
  components: {
    Header,
    FilterOptions,
    CardsListView,
    Loader,
    Error,
  },
};
</script>
