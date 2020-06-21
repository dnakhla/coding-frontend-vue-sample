import {
  favoritePoke,
  removeFavoritePoke,
  getPokeByID,
  getPokeTypes,
} from "@/services/graphql-api/api";
import { isInViewport } from "@/util";

export const infiniteScrollMixin = (NEW_CALL_COUNT, el) => {
  return {
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    mounted() {
      console.log("addedscroll");
      window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
      async loadMore() {
        var loadMoreButton = document.getElementById(el);
        let bottomOfWindow = false;
        if (loadMoreButton) bottomOfWindow = isInViewport(loadMoreButton);
        if (bottomOfWindow) {
          try {
            this.state.pageindex = this.state.pageindex + NEW_CALL_COUNT;
            let newData = await this.runQuery();
            if (newData.length > 0) {
              this.state.list = [...this.state.list, ...newData];
              await this.loadMore();
            } else {
              this.state.allLoaded = true;
            }
          } catch (e) {
            this.updateErrMessage(e.toString());
          }
        }
      },
      async handleScroll() {
        await this.loadMore();
      },
    },
  };
};

export const navigationMixin = {
  data() {
    return {
      state: {
        tab: "all",
        searchquery: "",
        pokeTypes: [],
        isGrid: true,
        typequery: false,
      },
    };
  },
  async mounted() {
    if (this.state.pokeTypes.length == 0) {
      this.state.pokeTypes = await getPokeTypes();
    }
  },
  computed: {
    isFavorites() {
      return this.state.tab == "favorites";
    },
  },
  methods: {
    toggleIsGrid() {
      this.state.isGrid = !this.state.isGrid;
    },
    updateSearchByType(selectedType) {
      this.state.pageindex = 0;
      this.state.typequery = selectedType == "All" ? false : selectedType;
    },
    toggleFavTab() {
      this.state.tab = this.state.tab == "all" ? "favorites" : "all";
    },
  },
};

export const cacheMixin = {
  mounted() {
    window.addEventListener("unload", this.saveStateToCache);
  },
  beforeDestroy() {
    window.removeEventListener("unload", this.saveStateToCache);
  },
  beforeRouteLeave(to, from, next) {
    this.saveStateToCache();
    next();
  },
  methods: {
    saveStateToCache() {
      if (localStorage) {
        localStorage.setItem(
          "stateCache",
          JSON.stringify({
            ...this.state,
            isLoading: false,
            pageindex: 0,
            allLoaded: false,
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
  },
};

export const pokeActionsMixin = {
  methods: {
    async handleFavorite(pokeId) {
      try {
        await favoritePoke(pokeId);
        let updatedPoke = await getPokeByID(pokeId);
        this.$toast.open(updatedPoke.name + " added to Favorites!");
        return updatedPoke;
      } catch (e) {
        this.updateErrMessage(e.toString());
      }
    },
    async handleRemoveFavorite(pokeId) {
      try {
        await removeFavoritePoke(pokeId);
        let updatedPoke = await getPokeByID(pokeId);
        this.$toast.open({
          message: updatedPoke.name + " removed from Favorites!",
          type: "error",
        });
        return updatedPoke;
      } catch (e) {
        this.updateErrMessage(e.toString());
      }
    },
  },
};
