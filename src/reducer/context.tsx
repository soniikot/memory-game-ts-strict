import type { Dispatch, PropsWithChildren, FC } from 'react';
import { createContext, useReducer, useEffect } from 'react';
import { gameReducer, initialState } from './gameReducer';
import { IState, IAction, EAction } from '../types/common';
import useFetch from '../hooks/useFetch';

export const StateContext = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction>>(() => ({ type: EAction.startNewRound }));

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { data, isLoading, error } = useFetch();

  useEffect(() => {
    dispatch({ type: EAction.loading, payload: { isLoading } });
    dispatch({ type: EAction.error, payload: { error } });
  }, [isLoading, error]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch({ type: EAction.setAllCats, payload: { data } });
    }
  }, [data]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};
