import Confetti from 'react-confetti';
import { useContext, type FC, MouseEventHandler } from 'react';
import { DispatchContext, StateContext } from '../../reducer/context';
import { EAction, EGameStatus } from '../../types/common';

const GameStatus: FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { gameStatus, round } = state;

  const startNextRound: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: EAction.startNewRound });
  };

  return (
    <div>
      {gameStatus !== '' && (
        <div className="gameStatus">
          <h3>{gameStatus === EGameStatus.gameWon ? ' Congratulations, you won!' : ' Game Over! '}</h3>
          {gameStatus === EGameStatus.gameOver ||
            (EGameStatus.gameWon && (
              <>
                <Confetti className="confetti" width={1800} height={1000} />
                <button type="button" onClick={startNextRound}>
                  {round === 10 ? 'Start Again' : 'Start Next Round'}
                </button>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default GameStatus;
