import { useContext } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Score from './components/Score/Score';
import GameStatus from './components/GameStatus/GameStatus';
import StartButton from './components/StartButton';
import { StateContext } from './reducer/context';

const App = () => {
  const state = useContext(StateContext);

  const { showStartButton, showBoard, round } = state;

  return (
    <>
      <h1>Memory Game</h1>
      <div className="card">
        {showStartButton && <StartButton />}
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
