import type { Dispatch } from 'react';
import { useEffect, useContext } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Score from './components/Score/Score';
import GameStatus from './components/GameStatus/GameStatus';
import useFetch from './hooks/useFetch';
import { DispatchContext, StateContext } from './reducer/context';
import { IAction } from './types/common';

const App = () => {
  const { data, isLoading, error } = useFetch();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as Dispatch<IAction>;
  useEffect(() => {
    if (data) {
      const newRoundCats = data.slice(0, Math.min(10, 0 + state.round * 2));
      dispatch({
        type: 'set_round_cats',
        payload: { roundCats: newRoundCats },
      });
    }
  }, [data, state.round]);

  const startGame = () => {
    dispatch({ type: 'start_game' });
  };

  return (
    <>
      <h1>Memory Game</h1>
      <div className="card">
        {state.showStartButton && (
          <button type="button" className="start-btn" onClick={startGame}>
            Start Game
          </button>
        )}
        {state.showBoard && (
          <>
            <GameStatus />
            <Board isLoading={isLoading} error={error} />
            <h2>Round {state.round}</h2>
            <Score />
          </>
        )}
      </div>
    </>
  );
};

export default App;
