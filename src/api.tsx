import axios, { isAxiosError } from "axios"

interface PokemonSprite {
  front_default: string;
}

interface Pokemon {
  sprites: PokemonSprite
}

export const getPokemon = async (pokemon: string) => {
  try {
    const result = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )
    console.log();
    if (result) {
      return result.data.sprites.front_default;
    }
    return null;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error(`Error fetching pokemon ${pokemon}: ${e}`);
      return e.message;
    } else {
      console.error(`Unexpected error fetching pokemon ${pokemon}: ${e}`);
      return "Unexpected error";
    }
  }
};