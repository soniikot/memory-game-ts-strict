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

export interface IBoard {
  isLoading: boolean;
  error: TError;
}

export interface IUseFetch {
  data: ICatData[];
  isLoading: boolean;
  error: TError;
}

export enum EGameStatus {
  gameWon = 'gameWon',
  gameOver = "gameOver",
}