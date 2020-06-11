<template>
  <div>
    {{ JSON.stringify(poke) }}
  </div>
</template>

<script>
import {
  getPokeByName,
  favoritePoke,
  removeFavoritePoke,
} from "@/services/graphql-api/api";
export default {
  data() {
    return {
      poke: false,
    };
  },
  async created() {
    let poke = await getPokeByName(this.$route.params.name);
    this.poke = poke;
  },
};
</script>
