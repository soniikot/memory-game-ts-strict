import type { Reducer } from 'react';
import { IState, IAction } from '../types/common';
import { TOTAL_PICTURES, NEW_ROUND_PICTURES_ADD_NUM } from './constants';

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

//TODO
/**
 *
 * ENUM EActionType {
 *
 * startGame = 'start_game'
 *
 * }
 *
 *
 * magic numbers
 *
 * .constants.ts
 * const TOTAL_PICTURES = 10
 *
 **/

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
        roundCats: state.data.slice(0, Math.min(TOTAL_PICTURES, NEW_ROUND_PICTURES_ADD_NUM)),
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
        roundCats: state.data.slice(0, Math.min(TOTAL_PICTURES, state.round + NEW_ROUND_PICTURES_ADD_NUM)),
      };

    case 'set_all_cats':
      if (!action.payload || !action.payload.data) {
        throw new Error('action.payload is required');
      }

      return {
        ...state,
        data: action.payload.data,
      };

    case 'loading': {
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }

    case 'error': {
      if (!action.payload) {
        return state; // Early return pattern
      }

      return {
        ...state,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};
