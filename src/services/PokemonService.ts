import { Pokemon } from 'pokenode-ts';
import PokemonApiProvider from '../provider/PokemonApiProvider';

const pokemonProvider = PokemonApiProvider;

export function getAllPokemons(): Promise<Pick<Pokemon, 'name'>[]> {
  return pokemonProvider.listPokemon();
}

export async function getPokemonbyName(name: string): Promise<Pokemon> {
  return await pokemonProvider.getPokemonByName(name);
}
