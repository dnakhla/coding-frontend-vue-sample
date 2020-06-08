import axios from "axios";
import queries from "./queries";
const POKE_API_BASE_URL =
  process.env.POKE_API_BASE_URL || "http://localhost:4000/graphql";

export async function getPokes(limit = 10, offset = 0) {
  const res = await axios.post(POKE_API_BASE_URL, {
    query: queries.getPokes({ limit, offset }),
  });
  let { list } = res.data.data.pokemons;
  return list;
}
