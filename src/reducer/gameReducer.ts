import type { Reducer } from 'react';
import { IState, IAction } from '../types/common';

export const initialState: IState = {
  showBoard: false,
  showStartButton: true,
  round: 0,
  isClicked: [],
  gameStatus: '',
  score: 0,
  isButtonsDisabled: false,
  roundCats: [],
};

export const gameReducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case 'start_game':
      return {
        ...state,
        showBoard: true,
        showStartButton: false,
        gameStatus: '',
        round: 1,
        score: 0,
        isClicked: [],
        isButtonsDisabled: false,
      };
    case 'card_clicked': {
      if (!action.payload) {
        throw new Error('action.payload is required');
      }
      const { id } = action.payload;

      if (id === undefined || id === null) {
        throw new Error('id is required');
      }
      if (state.isClicked.some((clickedImage) => clickedImage[id] !== undefined)) {
        return {
          ...state,
          gameStatus: 'gameOver',
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
          gameStatus: 'gameWon',
          isButtonsDisabled: true,
        };
      }
      return newState;
    }

    case 'start_new_round':
      return {
        ...state,
        gameStatus: '',
        round: state.round + 1,
        isClicked: [],
        isButtonsDisabled: false,
      };
    case 'set_round_cats':
      if (!action.payload) {
        throw new Error('action.payload is required');
      }
      return {
        ...state,
        roundCats: action.payload.roundCats || [],
      };

    default:
      return state;
  }
};
