import { useEffect, useReducer, MouseEvent, MouseEventHandler } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Score from './components/Score/Score';
import GameStatus from './components/GameStatus/GameStatus';
import useFetch from './hooks/useFetch';
import { gameReducer, initialState } from './reducer/gameReducer';

const App = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { data, isLoading, error } = useFetch();

  useEffect(() => {
    if (data) {
      const newRoundCats = data.slice(0, Math.min(10, 0 + state.round * 2));
      dispatch({
        type: 'set_round_cats',
        payload: { roundCats: newRoundCats },
      });
    }
  }, [data, state.round]);

  const rotateCards = () => {
    dispatch({
      type: 'set_round_cats',
      payload: { roundCats: state.roundCats.sort(() => Math.random() - 0.5) },
    });
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;
    dispatch({ type: 'card_clicked', payload: { id } });
    if (state.gameStatus !== 'gameOver' && state.gameStatus !== 'gameWon') {
      rotateCards();
    }
  };

  const startGame = () => {
    dispatch({ type: 'start_game' });
  };

  const startNextRound: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: 'start_new_round' });
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
            <GameStatus gameStatus={state.gameStatus} onClick={startNextRound} round={state.round} />
            <Board
              onClick={handleClick}
              roundCats={state.roundCats}
              isLoading={isLoading}
              error={error}
              isButtonsDisabled={state.isButtonsDisabled}
            />
            <h2>Round {state.round}</h2>
            <Score score={state.score} />
          </>
        )}
      </div>
    </>
  );
};

export default App;
