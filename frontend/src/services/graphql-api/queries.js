let simpleData = ["id", "name", "image", "types", "isFavorite"];
export default {
  getPokes: ({ limit, offset }) => {
    return `{
          pokemons(query: { limit: ${limit}, offset: ${offset} }) {
            list:edges {
                 ${simpleData.join("\n")}
            }
          }
        }`;
  },
  getFavorites: ({ limit, offset }) => {
    return `{
          pokemons(query: { limit: ${limit}, offset: ${offset}, filter: { isFavorite: true } }) {
            list:edges {
              ${simpleData.join("\n")}
            }
          }
        }`;
  },
  getPokeByName: ({ name }) => {
    return `{
          pokemons(query: { limit: ${limit}, offset: ${offset}, filter: { isFavorite: true } }) {
            list:edges {
              ${simpleData.join("\n")}
            }
          }
        }`;
  },
};
