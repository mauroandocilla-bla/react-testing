import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import App from './App';

afterEach(() => {
  cleanup();
});

describe("App", () => {
  test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Hello Pokemondonguero/i);
    expect(linkElement).toBeInTheDocument();
  });

})
