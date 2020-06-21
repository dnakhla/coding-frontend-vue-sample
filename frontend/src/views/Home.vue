<template>
  <div class="home">
    <Loader v-if="state.isLoading && !state.errorMsg" />
    <Error
      v-if="state.errorMsg"
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
            <option :selected="state.typequery == 'All'" value="All">
              All
            </option>
            <option
              v-for="(option, index) in state.pokeTypes"
              :key="`key-${index}`"
              :value="option"
              :selected="state.typequery == option"
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
      <button
        v-if="!state.allLoaded"
        id="loadmorebutton"
        @click.prevent="loadMore"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
button#loadmorebutton {
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
  Error
} from "@/components/";
import { getPokes } from "@/services/graphql-api/api";
import {
  cacheMixin,
  pokeActionsMixin,
  navigationMixin,
  infiniteScrollMixin
} from "@/util/mixins";
import { errorStateMixin } from "@/components/Error";
import { isLoadingMixin } from "@/components/Loader";
export default {
  name: "app",
  components: {
    Header,
    FilterOptions,
    CardsListView,
    Loader,
    Error
  },
  mixins: [
    navigationMixin,
    pokeActionsMixin,
    errorStateMixin,
    cacheMixin,
    isLoadingMixin,
    infiniteScrollMixin(NEW_CALL_COUNT, "loadmorebutton")
  ],
  data() {
    return {
      state: {
        pageindex: 0,
        list: [],
        allLoaded: false
      }
    };
  },
  async mounted() {
    try {
      if (this.$route.query.errorMsg) {
        this.updateIsLoading(false);
        this.updateErrMessage(this.$route.query.errorMsg);
        return;
      }
      let cachedState = this.rehydrateFromCache();
      if (cachedState) {
        this.state = cachedState;
      }
      if (this.state.list) {
        this.state.list = await this.runQuery();
        setTimeout(this.loadMore, 0);
      }
      this.updateIsLoading(false);
    } catch (e) {
      this.updateErrMessage(e.toString());
    }
  },
  watch: {
    async isFavorites() {
      this.state.pageindex = 0;
      this.state.list = await this.runQuery();
    },
    list() {
      this.state.allLoaded = false;
      setTimeout(this.loadMore, 0);
    }
  },
  computed: {
    list() {
      return this.state.list;
    }
  },
  methods: {
    async toggleMainTab() {
      this.toggleFavTab();
    },
    async onSearch() {
      this.state.pageindex = 0;
      this.state.list = await this.runQuery();
    },
    async onSearchByType(e) {
      let selectedType = e.target.value;
      this.updateSearchByType(selectedType);
      this.state.list = await this.runQuery();
    },
    async onListToggle() {
      this.toggleIsGrid();
    },
    async refreshPage() {
      this.updateIsLoading(true);
      this.updateErrMessage(false);
      setTimeout(() => {
        this.$router.go();
      }, 100);
    },
    async runQuery() {
      let opts = {
        limit: NEW_CALL_COUNT,
        offset: this.state.pageindex,
        isSearch: this.state.searchquery,
        isType: this.state.typequery,
        isFavorites: this.isFavorites
      };
      console.log(opts);
      this.updateIsLoading(true);
      let r = await getPokes(opts);
      this.updateIsLoading(false);
      return r;
    },
    async handleFav(pokeId) {
      let updatedPoke = await this.handleFavorite(pokeId);
      this.replacePokeInListWithUpdate(updatedPoke);
    },
    async handleRemoveFav(pokeId) {
      try {
        let updatedPoke = await this.handleRemoveFavorite(pokeId);
        this.replacePokeInListWithUpdate(updatedPoke);
      } catch (e) {
        this.updateErrMessage(e.toString());
      }
    },
    async replacePokeInListWithUpdate(pokeOb) {
      if (!this.isFavorites) {
        this.state.list = this.state.list.map(x => {
          if (x.id == pokeOb.id) {
            x = pokeOb;
          }
          return x;
        });
      } else {
        this.state.list = this.state.list.filter(x => {
          return x.id !== pokeOb.id;
        });
      }
    }
  }
};
</script>
