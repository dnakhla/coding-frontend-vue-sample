export default {
  getPokes: ({ limit, offset }) => {
    return `{
          pokemons(query: { limit: ${limit}, offset: ${offset} }) {
            list:edges {
                 id
                 name
                 image
                 types
                 isFavorite
            }
          }
        }`;
  },
};
