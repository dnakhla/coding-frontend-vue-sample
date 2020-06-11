let simpleDataFields = ["id", "name", "image", "types", "isFavorite"];
export default {
  getPokes: ({
    limit = 18,
    offset = 0,
    isFavorites = false,
    isSearch = false,
    isType = false
  }) => {
    let filters = "";
    let search = "";
    if (isFavorites || isType) {
      let favsub = isFavorites ? "isFavorite: true" : "";
      let typesub = isType ? `type: "${isType}" ` : "";
      filters = `filter: { 
          ${typesub}
          ${favsub}
       }`;
    }
    if (isSearch) {
      search = `search:"${isSearch}"`;
    }
    return `{
          pokemons(query: { limit:${limit} offset: ${offset} 
            ${search}
            ${filters} }) {
            list:edges {
                 ${simpleDataFields.join("\n")}
            }
          }
        }`;
  },
  getPokeByName: ({ name }) => {
    return `{
            poke:pokemonByName(name: "${name}") {
               ${simpleDataFields.join("\n")}
                  sound
                  weight {
                    minimum
                    maximum
                  }
                  height {
                    minimum
                    maximum
                  }
                  maxHP
                  maxCP
                  evolutions {
                    id
                    name
                    image
                    isFavorite
                  }
            }
          }`;
  },
  getPokeTypes: () => {
    return `{types:pokemonTypes}`;
  },
  favoritePokeById: ({ id }) => {
    return `mutation{
            favoritePokemon(id:"${id}"){
              ${simpleDataFields.join("\n")}
            }
          }`;
  },
  removeFavoritePokeById: ({ id }) => {
    return `mutation{
            unFavoritePokemon(id:"${id}"){
              ${simpleDataFields.join("\n")}
            }
          }`;
  }
};
