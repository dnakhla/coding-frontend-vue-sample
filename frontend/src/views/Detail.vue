<template>
  <div>
    <Loader v-if="!mainpoke" />
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
import { Card, Loader } from "@/components/";
export default {
  name: "Details",
  components: {
    Card,
    Loader,
  },
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
      await favoritePoke(pokeId);
      this.mainpoke = await getPokeByName(this.$route.params.name);
    },
    handleRemoveFav: async function(pokeId) {
      await removeFavoritePoke(pokeId);
      this.mainpoke = await getPokeByName(this.$route.params.name);
    },
  },
};
</script>
