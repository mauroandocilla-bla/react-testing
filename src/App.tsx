import React from 'react';
import {PokemonProvider} from "./context/PokemonContext";
import {PokemonGuesser} from "./components/PokemonGuesser";
import './style.css';

function App() {
  return (
    <div>
      <h1>Hello Pokemondonguero</h1>
      <div>
        <p>Have fun while testing your code</p>
        <h2>Instructions</h2>
        <ul>
          <li>
            Install jest and react-testing-library and setup your testing
            environment
          </li>
          <li>You can add any other library to help you with testing</li>
          <li>
            You can make as many refactors as you need in the code to make the
            testing job easier. (Of course, functionality shouldn't change)
          </li>
          <li>
            Add as much test as you can during the assessment time frame, Check
            the code coverage from the jest test results
          </li>
        </ul>
      </div>
      <PokemonProvider>
        <PokemonGuesser/>
      </PokemonProvider>
    </div>
  );
}

export default App;
