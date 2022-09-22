import React, {useState} from 'react';
import {useGetRandomPokemon} from './hooks/useGetRandomPokemon';
import {PokemonGuesserPresentational} from './PokemonGuesserPresentational';
import {ResultState} from './types';
import {usePokemon} from '../../context/PokemonContext';
import {useAllPokemons} from '../../hooks/useAllPokemons';

export const PokemonGuesserContainer = () => {
  const {randomPokemon, changeRandomPokemon} = useGetRandomPokemon();
  const [stateGuess, setStateGuess] = useState<ResultState>(
    ResultState.GUESSING
  );

  const {dispatch} = usePokemon();

  const getAllPokemons = useAllPokemons(dispatch);

  const onCheck = (name: string) => {
    if (name.toLowerCase() === randomPokemon?.name.toLowerCase()) {
      setStateGuess(ResultState.SUCCESS);
    } else {
      setStateGuess(ResultState.ERROR);
    }
  };

  React.useEffect(() => {
    getAllPokemons();
  }, []);

  const onRetry = () => {
    changeRandomPokemon();
    setStateGuess(ResultState.GUESSING);
  };

  const isPokemonInfoAvailable = Boolean(randomPokemon);

  return (
    <PokemonGuesserPresentational
      pokemon={randomPokemon}
      isLoading={!isPokemonInfoAvailable}
      onCheck={onCheck}
      onRetry={onRetry}
      state={stateGuess}
    />
  );
};
