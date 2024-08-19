import type { ReactNode, Dispatch } from 'react';
import { createContext, useReducer } from 'react';
import { gameReducer, initialState } from './gameReducer';

import type { IState, IAction } from '../types/common';

export const StateContext = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction> | null>(null);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};
