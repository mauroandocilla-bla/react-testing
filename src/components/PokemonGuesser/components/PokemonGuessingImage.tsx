import React from 'react';
import {
  PokemonGuessingImageProps,
  ResultState,
} from '../types';
import styled from 'styled-components';

interface PokemonImageProps {
  isGuessing: boolean
}

const PokemonImage = styled.img<PokemonImageProps>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.isGuessing ? 'black' : 'white')};
`;

export const PokemonGuessingImage = (props: PokemonGuessingImageProps) => {
  return (
    <PokemonImage
      data-testid="pokemon-image"
      isGuessing={props.state === ResultState.GUESSING}
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props?.pokemon?.id}.png`}
    />
  );
};
