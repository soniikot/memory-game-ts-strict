import Confetti from 'react-confetti';
import type { FC } from 'react';
import type { IGameStatus } from '../../types/common';

const GameStatus: FC<IGameStatus> = ({ gameStatus, onClick, round }) => (
  <div>
    {gameStatus && (
      <div className="gameStatus">
        <h3>{gameStatus === 'gameWon' ? ' Congratulations, you won!' : ' Game Over! '}</h3>
        {gameStatus === 'gameWon' && (
          <>
            <Confetti className="confetti" width={1800} height={1000} />
            <button type="button" onClick={round === 5 ? () => window.location.reload() : onClick}>
              {round === 5 ? 'Start Again' : 'Start Next Round'}
            </button>
          </>
        )}
      </div>
    )}
  </div>
);

export default GameStatus;
