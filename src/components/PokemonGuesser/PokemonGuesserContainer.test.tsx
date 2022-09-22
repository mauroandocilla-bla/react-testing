import React from 'react';
import {act, cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {PokemonGuesserContainer} from "./PokemonGuesserContainer";
import {Pokemon} from "pokenode-ts";
import {PokemonProvider} from "../../context/PokemonContext";
import * as PokemonContext from "../../context/PokemonContext";
import {ContextValue} from "../../context/types";
import * as getRandomInt from "./lib/getRandomInt";
import PokemonApiProvider from "../../provider/PokemonApiProvider";

const pokemons = [
  {name: 'bulbasaur'},
  {name: 'ivysaur'},
  {name: 'venusaur'},
  {name: 'charmander'},
  {name: 'charmeleon'},
  {name: 'charizard'},
  {name: 'squirtle'},
  {name: 'wartortle'},
  {name: 'blastoise'},
  {name: 'caterpie'},
  {name: 'metapod'},
  {name: "alakazam"},
];

const randomPokemon = {id: 10, name: 'metapod'} as Pokemon;

const updatedPokemons = [...pokemons.map((pokemon) =>
  pokemon.name === randomPokemon.name ? randomPokemon : pokemon
)];

const context: ContextValue = {
  state: {
    isLoading: false,
    pokemons: []
  },
  dispatch: jest.fn()
};

let mockContext: jest.SpyInstance<ContextValue, []>;

beforeEach(() => {
  mockContext = jest.spyOn(PokemonContext, 'usePokemon').mockReturnValue(context);
  jest.spyOn(getRandomInt, 'getRandomInt').mockReturnValue(10);
  jest.spyOn(PokemonApiProvider, 'getPokemonByName').mockImplementation(() => Promise.resolve(randomPokemon));
})


afterEach(() => {
  cleanup();
});

const componentRender = () => (
  <PokemonProvider>
    <PokemonGuesserContainer/>
  </PokemonProvider>
);

describe('PokemonGuesserContainer', () => {
  test('should display the infinite spin when loading the data', async () => {
    render(componentRender());
    expect(screen.getByTestId('infinity-spin')).toBeInTheDocument();
  });

  test('should display the infinite spin when loading the data', async () => {
    mockContext.mockReturnValue({
      ...context,
      state: {isLoading: false, pokemons: updatedPokemons}
    });
    render(componentRender());
    let image = screen.getByTestId('pokemon-image');
    expect(image).toBeInTheDocument();
  });

  test('should display image and form when list of pokemon returned', async () => {
    mockContext.mockReturnValue({
      ...context,
      state: {isLoading: false, pokemons: updatedPokemons}
    });
    render(componentRender());
    let image = screen.getByTestId('pokemon-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png');
    let form = screen.getByTestId('pokemon-form');
    expect(form).toBeInTheDocument();
  });

  test('should display Excellent!! when guess the pokemon name', async () => {
    mockContext.mockReturnValue({
      ...context,
      state: {isLoading: false, pokemons: updatedPokemons}
    });
    render(componentRender());
    const input = screen.getByTestId('pokemon-input');
    fireEvent.change(input, {target: {value: 'metapod'}});
    const button = screen.getByTestId('pokemon-button');
    fireEvent.click(button);
    expect(screen.getByText(/Excellent!!/i)).toBeInTheDocument();
  });

  test("should display Oops, That's wrong!! when don't guess the pokemon name", async () => {
    mockContext.mockReturnValue({
      ...context,
      state: {isLoading: false, pokemons: updatedPokemons}
    });
    render(componentRender());
    const input = screen.getByTestId('pokemon-input');
    fireEvent.change(input, {target: {value: 'charizard'}});
    const button = screen.getByTestId('pokemon-button');
    fireEvent.click(button);
    expect(screen.getByText(/Oops, That's wrong/i)).toBeInTheDocument();
    const retryButton = screen.getByTestId('pokemon-retry-button');
    expect(retryButton).toBeInTheDocument();
  });

  test("should return to the main screen when the Try Again button is pressed", async () => {
    mockContext.mockReturnValue({
      ...context,
      state: {isLoading: false, pokemons: updatedPokemons}
    });
    render(componentRender());
    const input = screen.getByTestId('pokemon-input');
    fireEvent.change(input, {target: {value: 'charizard'}});
    const button = screen.getByTestId('pokemon-button');
    fireEvent.click(button);
    const retryButton = screen.getByTestId('pokemon-retry-button');
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-form')).toBeInTheDocument();
  });
});
