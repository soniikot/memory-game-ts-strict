import { useContext } from 'react';
import type { FC, MouseEvent } from 'react';
import './Board.css';
import { DispatchContext, StateContext } from '../../reducer/context';
import { EGameStatus, EAction } from '../../types/common';

const Board: FC = () => {
  const state = useContext(StateContext);

  const { isLoading, error } = state;

  const { gameStatus } = state;
  const dispatch = useContext(DispatchContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;

    dispatch({ type: EAction.cardClicked, payload: { id } });

    if (gameStatus !== EGameStatus.gameOver && gameStatus !== EGameStatus.gameWon) {
      dispatch({
        type: EAction.setAllCats,
        payload: { roundCats: state.roundCats.sort(() => Math.random() - 0.5) },
      });
    }
  };
  return (
    <>
      <h2>Do not click at the same card twice!</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!error && (
        <div className="catField">
          {state.roundCats.map(({ id, url, title }) => (
            <button type="button" disabled={state.isButtonsDisabled} onClick={handleClick} key={id}>
              <img className="cardImage" id={id} src={url} alt={title} />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Board;
