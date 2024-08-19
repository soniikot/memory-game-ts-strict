import type { FC } from 'react';
import { useContext } from 'react';
import { StateContext } from '../../reducer/context';

const Score: FC = () => {
  const bestScore = parseInt(localStorage.getItem('bestScore') || '0', 10);
  const state = useContext(StateContext);

  if (state.score > bestScore) {
    localStorage.setItem('bestScore', state.score.toString());
  }
  return (
    <>
      <h3>Current Score: {state.score}</h3>
      <h3>Best Score: {bestScore}</h3>
    </>
  );
};

export default Score;
