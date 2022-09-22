import {Pokemon} from 'pokenode-ts';
import {useMemo, useState} from 'react';
import {MAX_POKEMON_QUANTITY} from '../../../constants';
import {usePokemonDetail} from '../../../hooks/usePokemonDetail';
import {getRandomInt} from '../lib/getRandomInt';
import {usePokemon} from "../../../context/PokemonContext";

export function useGetRandomPokemon(): {
  randomPokemon: Pokemon | null;
  changeRandomPokemon: () => void;
} {
  const [randomIdx, setRandomIdx] = useState(
    getRandomInt(MAX_POKEMON_QUANTITY)
  );

  const {
    state: {pokemons, isLoading},
    dispatch,
  } = usePokemon();

  const fillPokemonDetail = usePokemonDetail(dispatch);

  const randomPokemon = useMemo(() => {
    const pokemonInfo = pokemons[randomIdx];
    
    if (pokemons.length > 0 && pokemonInfo.id) {
      return pokemonInfo as Pokemon;
    } else if (pokemonInfo?.name && !isLoading) {
      fillPokemonDetail(pokemonInfo.name);
    }

    return null;
  }, [
    randomIdx,
    pokemons?.[randomIdx]?.id,
    pokemons?.[randomIdx]?.name,
    pokemons.length,
  ]);

  const changeRandomPokemon = () => {
    setRandomIdx(getRandomInt(MAX_POKEMON_QUANTITY));
  };

  return {randomPokemon, changeRandomPokemon};
}
