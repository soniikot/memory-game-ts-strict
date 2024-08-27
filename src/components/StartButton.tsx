import type { FC } from 'react';
import { useContext } from 'react';
import { EAction } from '../types/common';
import { DispatchContext } from '../reducer/context';

const StartButton: FC = () => {
  const dispatch = useContext(DispatchContext);

  return (
    <button
      type="button"
      className="start-btn"
      onClick={() => {
        dispatch({ type: EAction.startGame });
      }}
    >
      Start Game
    </button>
  );
};

export default StartButton;
