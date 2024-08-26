import { useContext } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Score from './components/Score/Score';
import GameStatus from './components/GameStatus/GameStatus';
import { DispatchContext, StateContext } from './reducer/context';

const App = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { showStartButton, showBoard, round } = state;

  const startGame = () => {
    dispatch({ type: 'start_game' });
  };

  //TODO
  /**
   * StartGame comnponent
   *
   * dispatch
   * start
   *
   *
   **/

  return (
    <>
      <h1>Memory Game</h1>
      <div className="card">
        {showStartButton && (
          <button type="button" className="start-btn" onClick={startGame}>
            Start Game
          </button>
        )}
        {showBoard && (
          <>
            <GameStatus />
            <Board />
            <h2>Round {round}</h2>
            <Score />
          </>
        )}
      </div>
    </>
  );
};

export default App;
