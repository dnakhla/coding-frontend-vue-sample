import axios from "axios";
import queries from "./queries";
const POKE_API_BASE_URL =
  process.env.POKE_API_BASE_URL || "http://localhost:4000/graphql";

function createCall(query) {
  return axios.post(POKE_API_BASE_URL, {
    query
  });
}

export async function getPokes({
  limit = 18,
  offset = 0,
  isSearch = false,
  isFavorites = false,
  isType = false
}) {
  const res = await createCall(
    queries.getPokes({ limit, offset, isSearch, isType, isFavorites })
  );
  let { list } = res.data.data.pokemons;
  return list;
}

export async function getPokeByName(name) {
  const res = await createCall(queries.getPokeByName({ name }));
  return res.data.data.poke;
}

export async function getPokeByID(id) {
  const res = await createCall(queries.getPokeByID({ id }));
  return res.data.data.poke;
}

export async function getPokeTypes() {
  const res = await createCall(queries.getPokeTypes());
  let { types } = res.data.data;
  return types;
}

export async function favoritePoke(id) {
  const res = await createCall(queries.favoritePokeById({ id }));
  let { types } = res.data.data;
  return types;
}

export async function removeFavoritePoke(id) {
  const res = await createCall(queries.removeFavoritePokeById({ id }));
  let { types } = res.data.data;
  return types;
}
