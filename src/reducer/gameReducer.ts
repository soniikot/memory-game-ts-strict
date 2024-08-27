import type { Reducer } from 'react';
import { IState, IAction, EGameStatus, EAction } from '../types/common';
import FIRST_ROUND_PICTURES from './constants';

export const initialState: IState = {
  showBoard: false,
  showStartButton: true,
  round: 0,
  isClicked: [],
  gameStatus: '',
  score: 0,
  isButtonsDisabled: false,
  roundCats: [],
  isLoading: false,
  error: null,
  data: [],
};

export const gameReducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case EAction.startGame:
      if (!state.data) {
        return state;
      }
      return {
        ...state,
        showBoard: true,
        showStartButton: false,
        gameStatus: '',
        round: 1,
        score: 0,
        isClicked: [],
        isButtonsDisabled: false,
        roundCats: state.data.slice(0, NEW_ROUND_PICTURES_ADD_NUM),
      };

    case EAction.cardClicked: {
      const { id } = action.payload;

      if (id === undefined || id === null) {
        return state;
      }

      if (state.isClicked.some((clickedImage) => clickedImage[id])) {
        return {
          ...state,
          gameStatus: EGameStatus.gameOver,
          showStartButton: true,
          isButtonsDisabled: true,
        };
      }

      const newState = {
        ...state,
        isClicked: [...state.isClicked, { [id]: true }],
        score: state.score + 1,
      };

      if (newState.isClicked.length === newState.roundCats.length) {
        return {
          ...newState,
          gameStatus: EGameStatus.gameWon,
          isButtonsDisabled: true,
        };
      }

      return newState;
    }

    case EAction.startNewRound:
      if (!state.data) {
        return state;
      }
      return {
        ...state,
        gameStatus: '',
        round: state.round + 1,
        isClicked: [],
        isButtonsDisabled: false,
        roundCats: state.data.slice(0, state.round + FIRST_ROUND_PICTURES),
      };

    case EAction.setAllCats:
      if (!action.payload.data) {
        return state;
      }

      return {
        ...state,
        data: action.payload.data,
      };

    case EAction.loading: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }

    case EAction.error: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};
