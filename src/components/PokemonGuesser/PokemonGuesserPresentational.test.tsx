import React from 'react';
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {PokemonGuesserPresentational} from "./PokemonGuesserPresentational";
import {PresentationalProps, ResultState} from "./types";

const mockProps: PresentationalProps = {
  state: ResultState.GUESSING,
  onCheck: jest.fn(),
  onRetry: jest.fn(),
  pokemon: {id: 83},
  isLoading: false,
};

const componentRender = (props = mockProps) => <PokemonGuesserPresentational {...props} />;

afterEach(() => {
  cleanup();
});

describe('PokemonGuesserPresentational', () => {
  test('should display the infinite spin when loading the data', () => {
    render(componentRender({...mockProps, isLoading: true}));
    const infiniteSpin = screen.getByTestId('infinity-spin');
    expect(infiniteSpin).toBeInTheDocument();
  });

  test('should display image', () => {
    render(componentRender({...mockProps}));
    const image = screen.getByTestId('pokemon-image');
    expect(image).toBeInTheDocument();
  });

  test('should display the form in the guessing state', () => {
    render(componentRender());
    const form = screen.getByTestId('pokemon-form');
    expect(form).toBeInTheDocument();
    const input = screen.getByTestId('pokemon-input');
    expect(input).toBeInTheDocument();
    const button = screen.getByTestId('pokemon-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('should display the Try again button in the error state', () => {
    render(componentRender({...mockProps, state: ResultState.ERROR}));
    const retryButton = screen.getByTestId('pokemon-retry-button');
    expect(retryButton).toBeInTheDocument();
  });

  test('should display the Keep playing button in the success state', () => {
    render(componentRender({...mockProps, state: ResultState.SUCCESS}));
    const keepButton = screen.getByTestId('pokemon-keep-button');
    expect(keepButton).toBeInTheDocument();
    const linkElement = screen.getByText(/Excellent!!/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should execute the onCheck function when the form is submitted and the input text contains a string', () => {
    render(componentRender());
    const input = screen.getByTestId('pokemon-input');
    fireEvent.change(input, {target: {value: 'pokemon_name'}});
    const button = screen.getByTestId('pokemon-button');
    fireEvent.click(button);
    expect(mockProps.onCheck).toBeCalled();
    expect(mockProps.onCheck).toHaveBeenCalledWith('pokemon_name');
  });

  test('should execute the onRetry function when the Try again button is pressed in the error state', () => {
    render(componentRender({...mockProps, state: ResultState.ERROR}));
    const retryButton = screen.getByTestId('pokemon-retry-button');
    fireEvent.click(retryButton);
    expect(mockProps.onRetry).toBeCalled();
  });

  test('should execute the onRetry function when the Keep playing button is pressed in the success state', () => {
    render(componentRender({...mockProps, state: ResultState.SUCCESS}));
    const keepButton = screen.getByTestId('pokemon-keep-button');
    fireEvent.click(keepButton);
    expect(mockProps.onRetry).toBeCalled();
  });
});
