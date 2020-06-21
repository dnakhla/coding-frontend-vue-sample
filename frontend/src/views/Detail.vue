<template>
  <div>
    <Loader v-if="!mainpoke" />
    <Error
      v-if="!mainpoke && state.errorMsg"
      :errorMsg="state.errorMsg"
      :tryAgainHandler="defaultErrPageHandler"
    />
    <Card
      v-if="mainpoke"
      :isDetailedView="true"
      :onFav="handleFav"
      :onRemoveFav="handleRemoveFav"
      :poke="mainpoke"
    />
  </div>
</template>

<script>
import { getPokeByName } from "@/services/graphql-api/api";
import { Card, Error, Loader } from "@/components/";
import { pokeActionsMixin } from "@/util/mixins";
import { errorStateMixin } from "@/components/Error";

export default {
  name: "Details",
  components: {
    Card,
    Loader,
    Error,
  },
  mixins: [pokeActionsMixin, errorStateMixin],
  data() {
    return {
      mainpoke: false,
    };
  },
  async mounted() {
    try {
      let poke = await getPokeByName(this.$route.params.name);
      if (poke) {
        this.mainpoke = poke;
      } else {
        //404
        this.$router.push({
          name: "404",
          query: { redirecturl: this.$route.path },
        });
      }
    } catch (err) {
      //404
      this.$router.push({
        path: "/",
        query: {
          redirecturl: this.$route.path,
          errorMsg: err.toString(),
        },
      });
    }
  },
  watch: {
    async $route(to) {
      this.$router.go({
        path: to.path,
      });
    },
  },
  methods: {
    handleFav: async function(pokeId) {
      this.mainpoke = await this.handleFavorite(pokeId);
    },
    handleRemoveFav: async function(pokeId) {
      this.mainpoke = await this.handleRemoveFavorite(pokeId);
    },
  },
};
</script>
