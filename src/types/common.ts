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
  isLoading?: boolean;
  error?: TError;
  data: ICatData[];
}

//TODO
/**
  *
  * possibly make different actions
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
export interface IGenAction {
  type: string;
}

export interface IActionNoPayload extends IGenAction {}

export interface IActionWithPayload extends IGenAction {
  payload: {
    id?: string;
    roundCats?: ICatData[];
    data?: ICatData[];
    isLoading?: boolean;
    error?: TError | null;
  };
}

  * 
  **/

export interface IAction {
  type: string;
  payload?: {
    id?: string;
    roundCats?: ICatData[];
    data?: ICatData[];
    isLoading?: boolean;
    error?: TError | null;
  };
}

export interface IUseFetch {
  data: ICatData[];
  isLoading: boolean;
  error: TError;
}

export enum EGameStatus {
  gameWon = 'gameWon',
  gameOver = 'gameOver',
}
