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
  data: ICatData[] | undefined;
}

interface IActionNoPayload {
  type: EAction.startGame | EAction.startNewRound;
}

interface IActionWithPayload {
  type: EAction.cardClicked | EAction.setAllCats | EAction.loading | EAction.error;
  payload: {
    id?: string;
    data?: ICatData[] | undefined;
    roundCats?: ICatData[];
    isLoading?: boolean;
    error?: TError | null;
  };
}

export type IAction = IActionNoPayload | IActionWithPayload;

export enum EGameStatus {
  gameWon = 'gameWon',
  gameOver = 'gameOver',
}

export enum EAction {
  startGame = 'start_game',
  cardClicked = 'card_clicked',
  startNewRound = 'start_new_round',
  setAllCats = 'set_all_cats',
  loading = 'loading',
  error = 'error',
}
