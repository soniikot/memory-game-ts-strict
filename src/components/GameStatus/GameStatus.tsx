import Confetti from 'react-confetti';
import { useContext, type FC, MouseEventHandler, Dispatch } from 'react';
import { DispatchContext, StateContext } from '../../reducer/context';
import { IAction } from '../../types/common';
const GameStatus: FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as Dispatch<IAction>;
  const { gameStatus, round } = state;

  const startNextRound: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: 'start_new_round' });
  };

  return (
    <div>
      {gameStatus !== '' && (gameStatus === 'gameOver' || gameStatus === 'gameWon') && (
        <div className="gameStatus">
          <h3>{gameStatus === 'gameWon' ? ' Congratulations, you won!' : ' Game Over! '}</h3>
          {gameStatus === 'gameWon' && (
            <>
              <Confetti className="confetti" width={1800} height={1000} />
              <button type="button" onClick={startNextRound}>
                {round === 5 ? 'Start Again' : 'Start Next Round'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GameStatus;
