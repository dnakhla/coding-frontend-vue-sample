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
  removeFavoritePoke
} from "@/services/graphql-api/api";
import { Card } from "@/components/";
export default {
  name: "Details",
  components: {
    Card
  },
  data() {
    return {
      mainpoke: false
    };
  },
  watch: {
    async $route(to) {
      this.mainpoke = await getPokeByName(to.params.name);
    }
  },
  methods: {
    handleFav: async function(pokeId) {
      await favoritePoke(pokeId);
      this.mainpoke = await getPokeByName(this.$route.params.name);
    },
    handleRemoveFav: async function(pokeId) {
      await removeFavoritePoke(pokeId);
      this.mainpoke = await getPokeByName(this.$route.params.name);
    }
  },
  async mounted() {
    try {
      let poke = await getPokeByName(this.$route.params.name);
      if (poke) {
        this.mainpoke = poke;
      } else {
        //404
        this.$router.push("/");
      }
    } catch (error) {
      //404
      this.$router.push("/");
    }
  }
};
</script>
