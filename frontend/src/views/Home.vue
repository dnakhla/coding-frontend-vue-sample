<template>
  <div class="home">
    <Loader v-if="state.isLoading" />
    <Error
      v-if="!state.isLoading && state.errorMsg"
      :errorMsg="state.errorMsg"
      :tryAgainHandler="refreshPage"
    />
    <div v-if="!state.isLoading && !state.errorMsg">
      <Header :tab="state.tab" :handleToggle="toggleMainTab" />
      <FilterOptions :isGrid="state.isGrid">
        <form slot="searchform" @submit.prevent="onSearch">
          <input
            id="namesearch"
            type="text"
            v-model="state.searchquery"
            @emptied="onSearch"
            placeholder="Search by Name"
          />
        </form>
        <div slot="filter" class="filter">
          <select @change="onSearchByType">
            <option value="All">
              All
            </option>
            <option
              v-for="(option, index) in state.pokeTypes"
              :key="`key-${index}`"
              :value="option"
              :selected="state.typequery"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div slot="grid" class="viewsettings" @click="onListToggle">
          <button :class="{ active: state.isGrid }">
            Grid
          </button>
          <button :class="{ active: !state.isGrid }">List</button>
        </div>
      </FilterOptions>
      <CardsListView
        :isGrid="state.isGrid"
        :list="state.list"
        :allLoaded="state.allLoaded"
        :onFav="handleFav"
        :onRemoveFav="handleRemoveFav"
      />
      <button v-if="!state.allLoaded" id="loadmore" @click.prevent="loadMore">
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
const NEW_CALL_COUNT = 9 * 2;
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
  getPokeTypes,
} from "@/services/graphql-api/api";
import { isInViewport } from "@/util";

export default {
  name: "app",
  data() {
    return {
      state: {
        pokeTypes: [],
        isLoading: true,
        errorMsg: false,
        tab: "all",
        searchquery: "",
        isGrid: true,
        typequery: false,
        pageindex: 0,
        list: [],
        allLoaded: false,
      },
    };
  },
  beforeUpdate() {
    if (this.$route.query.redirecturl && !this.state.errorMsg) {
      this.$router.push({
        path: this.$route.query.redirecturl,
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.saveStateToCache();
    next();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("unload", this.saveStateToCache);
  },
  async mounted() {
    if (this.$route.query.errorMsg) {
      this.updateisLoading(false);
      this.updateErrMessage(this.$route.query.errorMsg);
      return;
    }
    let cachedState = this.rehydrateFromCache();
    if (cachedState) {
      this.state = cachedState;
    }
    try {
      if (this.state.list.length === 0) {
        this.state.list = await this.runQuery();
        setTimeout(this.loadMore, 0);
      }
      if (this.state.pokeTypes.length == 0) {
        this.state.pokeTypes = await getPokeTypes();
      }
      //load more on scroll
    } catch (e) {
      this.updateErrMessage(e.toString());
    }
    this.updateisLoading(false);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("unload", this.saveStateToCache);
  },

  watch: {
    async isFavorites() {
      this.state.pageindex = 0;
      this.state.list = await this.runQuery();
    },
    list() {
      this.state.allLoaded = false;
      setTimeout(this.loadMore, 0);
    },
  },
  computed: {
    list() {
      return this.state.list;
    },
    isFavorites() {
      return this.state.tab == "favorites";
    },
  },

  methods: {
    saveStateToCache() {
      if (localStorage) {
        localStorage.setItem(
          "stateCache",
          JSON.stringify({
            ...this.state,
            isLoading: false,
          })
        );
      }
    },
    rehydrateFromCache() {
      if (localStorage) {
        return JSON.parse(localStorage.getItem("stateCache"));
      }
      return false;
    },
    refreshPage: function() {
      this.updateisLoading(true);
      this.updateErrMessage(false);
      setTimeout(() => {
        this.$router.go();
      }, 100);
    },
    updateisLoading: function(isLoading) {
      this.state.isLoading = isLoading;
    },
    updateErrMessage: function(message) {
      this.state.errorMsg = message;
    },
    runQuery: async function() {
      let opts = {
        limit: NEW_CALL_COUNT,
        offset: this.state.pageindex,
        isSearch: this.state.searchquery,
        isType: this.state.typequery,
        isFavorites: this.isFavorites,
      };
      return await getPokes(opts);
    },
    onListToggle: async function() {
      this.state.isGrid = !this.state.isGrid;
    },
    onSearchByType: async function(e) {
      let selectedType = e.target.value;
      this.state.pageindex = 0;
      this.state.typequery = selectedType == "All" ? false : selectedType;
      this.state.list = await this.runQuery();
    },
    onSearch: async function() {
      this.state.pageindex = 0;
      this.state.list = await this.runQuery();
    },
    //@TOOD turn to mixin
    toggleMainTab: async function() {
      this.state.tab = this.state.tab == "all" ? "favorites" : "all";
    },
    handleFav: async function(pokeId) {
      try {
        await favoritePoke(pokeId);
        let updatedPoke = await getPokeByID(pokeId);
        this.replacePokeInListWithUpdate(updatedPoke);
      } catch (e) {
        this.updateErrMessage(e.toString());
      }
    },
    handleRemoveFav: async function(pokeId) {
      try {
        await removeFavoritePoke(pokeId);
        let updatedPoke = await getPokeByID(pokeId);
        if (!this.isFavorites) {
          this.replacePokeInListWithUpdate(updatedPoke);
        } else {
          this.state.list = this.state.list.filter((x) => {
            return x.id !== pokeId;
          });
        }
      } catch (e) {
        this.updateErrMessage(e.toString());
      }
    },
    replacePokeInListWithUpdate: function(pokeOb) {
      this.state.list = this.state.list.map((x) => {
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
          this.state.pageindex = this.state.pageindex + NEW_CALL_COUNT;
          let newData = await this.runQuery();
          //if we have more pokes lets add them
          if (newData.length > 0) {
            this.state.list = [...this.state.list, ...newData];
            await this.loadMore();
          } else {
            //if no data lets stop listening to the scroll
            this.state.allLoaded = true;
            window.removeEventListener("scroll", this.handleScroll);
          }
        } catch (e) {
          this.updateErrMessage(e.toString());
        }
      }
    },
    handleScroll: async function() {
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
