import type { Dispatch, PropsWithChildren, FC } from 'react';
import { createContext, useEffect, useReducer } from 'react';
import { gameReducer, initialState } from './gameReducer';

import type { IState, IAction } from '../types/common';
import useFetch from '../hooks/useFetch';
export const StateContext = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction>>(() => ({type: 'start_new_round' }));

export const StateProvider: FC<PropsWithChildren>  = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { data } = useFetch();

  // useEffect(() => {
  //   if (data) {
  //     const newRoundCats = data.slice(0, Math.min(10, 0 + round * 2));
  //     dispatch({
  //       type: 'set_round_cats',
  //       payload: { roundCats: newRoundCats },
  //     });
  //   }
  // }, [data, round]);

  useEffect(() => {
    if(!data){
      return
    }
    
    const newRoundCats = data.slice(0, Math.min(10, 1 * 2));

    dispatch({
      type: 'set_round_cats',
      payload: { roundCats: newRoundCats },
    });

    dispatch({
      type: 'cats_cats'
      payload: {catsData: data}
    })

  }, [])


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};
