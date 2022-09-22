import React from 'react';
import {PresentationalProps, ResultState} from './types';
import {InfinitySpin} from 'react-loader-spinner';
import {PokemonGuessingImage} from './components/PokemonGuessingImage';

export const PokemonGuesserPresentational = (props: PresentationalProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    inputRef.current?.value && props.onCheck(inputRef.current.value);
  };

  return (
    <React.Fragment>
      {props.isLoading ? (
        <InfinitySpin width="80" color="green"/>
      ) : (
        <React.Fragment>
          <div>
            <PokemonGuessingImage state={props.state} pokemon={props.pokemon}/>
          </div>
          <div>
            {props.state === ResultState.ERROR && (
              <span>Oops, That's wrong</span>
            )}
            {props.state === ResultState.SUCCESS && <span>Excellent!!</span>}
          </div>
          <div>
            {props.state === ResultState.GUESSING && (
              <form onSubmit={onSubmit} data-testid="pokemon-form">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Who's that Pokemon?"
                  defaultValue=""
                  data-testid="pokemon-input"
                />
                {props.state === ResultState.GUESSING && (
                  <button type="submit" data-testid="pokemon-button">Check</button>
                )}
              </form>
            )}
            {props.state === ResultState.ERROR && (
              <button onClick={props.onRetry} data-testid="pokemon-retry-button">Try again</button>
            )}
            {props.state === ResultState.SUCCESS && (
              <button onClick={props.onRetry} data-testid="pokemon-keep-button">Keep playing</button>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
