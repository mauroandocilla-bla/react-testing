import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import {PokemonGuessingImage} from './PokemonGuessingImage';
import {PokemonGuessingImageProps, ResultState} from "../types";

const mockProps: PokemonGuessingImageProps = {
  state: ResultState.GUESSING,
  pokemon: {id: 83}
};

const componentRender = (props = mockProps) => <PokemonGuessingImage {...props} />;

afterEach(() => {
  cleanup();
});

describe('PokemonGuessingImage', () => {
  test('should render the pokemon image', () => {
    render(componentRender());
    const image = screen.getByTestId('pokemon-image');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png');
  });

  test('should the pokemon image in the guessing state the background style be black', () => {
    render(componentRender());
    const image = screen.getByTestId('pokemon-image') as HTMLImageElement;
    expect(image).toHaveStyle('background: black');
  });

  test('should the pokemon image in the error state the background style be white', () => {
    render(componentRender({...mockProps, state: ResultState.ERROR}));
    const image = screen.getByTestId('pokemon-image') as HTMLImageElement;
    expect(image).toHaveStyle('background: white');
  });

  test('should the pokemon image in the success state the background style be white', () => {
    render(componentRender({...mockProps, state: ResultState.SUCCESS}));
    const image = screen.getByTestId('pokemon-image') as HTMLImageElement;
    expect(image).toHaveStyle('background: white');
  });

});

