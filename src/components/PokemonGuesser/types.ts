import {Pokemon} from 'pokenode-ts';

export enum ResultState {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  GUESSING = 'GUESSING',
}

export type PresentationalProps = {
  isLoading: boolean;
  pokemon: Pick<Pokemon, 'id'> | null;
  state: ResultState;
  onCheck: (name: string) => void;
  onRetry: () => void;
};

export type PokemonGuessingImageProps = {
  state: ResultState;
  pokemon: Pick<Pokemon, 'id'> | null;
};
