import axios from "axios";
import queries from "./queries";
const POKE_API_BASE_URL =
  process.env.POKE_API_BASE_URL || "http://localhost:4000/graphql";

export async function getPokes({
  limit = 18,
  offset = 0,
  isSearch = false,
  isFavorites = false,
  isType = false,
}) {
  const res = await axios.post(POKE_API_BASE_URL, {
    query: queries.getPokes({ limit, offset, isSearch, isType, isFavorites }),
  });
  let { list } = res.data.data.pokemons;
  return list;
}

export async function getPokeByName(name) {
  const res = await axios.post(POKE_API_BASE_URL, {
    query: queries.getPokeByName({ name }),
  });
  let { poke } = res.data;
  return poke;
}

export async function getPokeTypes() {
  const res = await axios.post(POKE_API_BASE_URL, {
    query: queries.getPokeTypes(),
  });
  let { types } = res.data.data;
  return types;
}
