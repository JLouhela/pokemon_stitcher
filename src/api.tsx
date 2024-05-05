import axios, { isAxiosError } from "axios"

interface PokemonSprite {
  front_default: string;
}

interface PokemonQuery {
  sprites: PokemonSprite
}

export const getPokemon = async (pokemon: string) => {
  try {
    const result = await axios.get<PokemonQuery>(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )
    if (result) {
      return { name: pokemon, sprite: result.data.sprites.front_default };
    }
    return null;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error(`Error fetching pokemon ${pokemon}: ${e}`);
    } else {
      console.error(`Unexpected error fetching pokemon ${pokemon}: ${e}`);
    }
    return null;
  }
};