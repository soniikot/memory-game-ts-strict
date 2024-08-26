import type { Dispatch, PropsWithChildren, FC } from 'react';
import { createContext, useReducer, useEffect } from 'react';
import { gameReducer, initialState } from './gameReducer';
import type { IState, IAction } from '../types/common';
import useFetch from '../hooks/useFetch';

export const StateContext = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction>>(() => ({ type: 'start_new_round' }));

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { data, isLoading, error } = useFetch();

  console.log(isLoading); /// remove

  useEffect(() => {
    dispatch({ type: 'loading', payload: { isLoading } });
    dispatch({ type: 'error', payload: { error } });
  }, [isLoading, error]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch({ type: 'set_all_cats', payload: { data } });
    }
  }, [data]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};
