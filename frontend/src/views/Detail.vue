<template>
  <div>
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
import {
  getPokeByName,
  favoritePoke,
  removeFavoritePoke,
} from "@/services/graphql-api/api";
import { Card } from "@/components/";
export default {
  name: "Details",
  components: {
    Card,
  },
  data() {
    return {
      mainpoke: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    getPokeByName(to.params.name)
      .then((poke) => {
        if (poke) {
          next((vm) => {
            vm.mainpoke = poke;
          });
        } else {
          next({
            name: "404",
            query: { redirecturl: to.path },
          });
        }
      })
      .catch((err) => {
        next({
          path: "/",
          query: {
            redirecturl: to.path,
            errorMsg: err.toString(),
          },
        });
      });
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
      await favoritePoke(pokeId);
      this.mainpoke = await getPokeByName(this.$route.params.name);
    },
    handleRemoveFav: async function(pokeId) {
      await removeFavoritePoke(pokeId);
      this.mainpoke = await getPokeByName(this.$route.params.name);
    },
  },
  async mounted() {},
};
</script>
