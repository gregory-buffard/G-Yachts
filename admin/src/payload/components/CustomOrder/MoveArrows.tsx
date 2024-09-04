import React from 'react'

export const MoveArrows = ({ onUp, onDown }: { onUp: () => void; onDown: () => void }) => {
  return (
    <div className="sort-column__buttons">
      <button className="sort-column__asc sort-column__button" onClick={onUp}>
        <svg
          className="icon icon--chevron"
          viewBox="0 0 9 7"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{
            transform: 'rotate(180deg)',
          }}
        >
          <path className="stroke" d="M1.42871 1.5332L4.42707 4.96177L7.42543 1.5332"></path>
        </svg>
      </button>
      <button className="sort-column__desc sort-column__button" onClick={onDown}>
        <svg
          className="icon icon--chevron"
          viewBox="0 0 9 7"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <path className="stroke" d="M1.42871 1.5332L4.42707 4.96177L7.42543 1.5332"></path>
        </svg>
      </button>
    </div>
  )
}
