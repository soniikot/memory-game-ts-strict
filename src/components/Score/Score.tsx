import type { FC } from 'react';

interface IScore {
  score: number;
}
const Score: FC<IScore> = ({ score }) => {
  const bestScore = parseInt(localStorage.getItem('bestScore') || '0', 10);
  if (score > bestScore) {
    localStorage.setItem('bestScore', score.toString());
  }
  return (
    <>
      <h3>Current Score: {score}</h3>
      <h3>Best Score: {bestScore}</h3>
    </>
  );
};

export default Score;
