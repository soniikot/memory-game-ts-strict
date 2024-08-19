import type { FC } from 'react';
import type { IBoard } from '../../types/common';
import './Board.css';

const Board: FC<IBoard> = ({ onClick, roundCats, isLoading, error, isButtonsDisabled }) => {
  //TODO
  /**
   * state  useContext
   *
   * dispatch
   *
   *
   **/

  return (
    <>
      <h2>Do not click at the same card twice!</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="catField">
        {roundCats.map(({ id, url, title }) => (
          <button type="button" disabled={isButtonsDisabled} onClick={onClick} key={id}>
            <img className="cardImage" id={id} src={url} alt={title} />
          </button>
        ))}
      </div>
    </>
  );
};

export default Board;
