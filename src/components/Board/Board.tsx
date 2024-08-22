import { useContext } from 'react';
import type { FC, MouseEvent, Dispatch } from 'react';
import './Board.css';
import { DispatchContext, StateContext } from '../../reducer/context';
import type { IBoard } from '../../types/common';

const Board: FC<IBoard> = ({ isLoading, error }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;

    dispatch({ type: 'card_clicked', payload: { id } });

    if (state.gameStatus !== 'gameOver' && state.gameStatus !== 'gameWon') {
      dispatch({
        type: 'set_round_cats',
        payload: { roundCats: state.roundCats.sort(() => Math.random() - 0.5) },
      });
    }
  };
  return (
    <>
      <h2>Do not click at the same card twice!</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!error && (<div className="catField">
        {(state.roundCats).map(({ id, url, title }) => (
          <button type="button" disabled={state.isButtonsDisabled} onClick={handleClick} key={id}>
            <img className="cardImage" id={id} src={url} alt={title} />
          </button>
        ))}
      </div>)}
    </>
  );
};

export default Board;
