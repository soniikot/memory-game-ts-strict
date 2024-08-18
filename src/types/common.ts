import { MouseEventHandler, MouseEvent } from 'react';

export type TError = null | string;

export interface ICatData {
  id: string;
  url: string;
  width: number;
  height: number;
  title?: string;
}

export interface IState {
  showBoard: boolean;
  showStartButton: boolean;
  gameStatus: string;
  round: number;
  score: number;
  isClicked: { [x: string]: boolean }[];
  isButtonsDisabled: boolean;
  roundCats: ICatData[];
}
export interface IAction {
  type: string;
  payload?: {
    id?: string;
    roundCats?: ICatData[];
  };
}

export interface IGameStatus {
  onClick: MouseEventHandler<HTMLButtonElement>;
  gameStatus: string;
  round: number;
}

export interface IBoard {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  roundCats: ICatData[];
  isLoading: boolean;
  error: TError;
  isButtonsDisabled: boolean;
}

export interface IUseFetch {
  data: ICatData[];
  isLoading: boolean;
  error: TError;
}
