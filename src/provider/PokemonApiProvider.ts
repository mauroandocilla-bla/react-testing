import { Pokemon, PokemonClient } from 'pokenode-ts';
import { MAX_POKEMON_QUANTITY } from '../constants';

class PokemonApiProvider {
  private static _instance: PokemonApiProvider;

  private pokemonApi: PokemonClient;

  private constructor() {
    this.pokemonApi = new PokemonClient({
      cacheOptions: { maxAge: 10000, exclude: { query: false } },
    });
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  getPokemonByName(name: string) {
    return this.pokemonApi.getPokemonByName(name);
  }

  async listPokemon(): Promise<Array<Pick<Pokemon, 'name'>>> {
    const { results } = await this.pokemonApi.listPokemons(
      0,
      MAX_POKEMON_QUANTITY
    );
    return results.map(({ name }) => ({ name }));
  }
}

export default PokemonApiProvider.Instance;
