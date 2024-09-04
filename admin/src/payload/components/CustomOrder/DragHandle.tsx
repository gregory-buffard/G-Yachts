import React from 'react'

export const DragHandle = ({
  onMouseDown,
}: {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {
  return (
    <div className="drag-handle" onMouseDown={onMouseDown}>
      <svg
        className="icon icon--drag-handle"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="fill" cx="10.468" cy="14.5" r="1"></circle>
        <circle className="fill" cx="14.532" cy="14.5" r="1"></circle>
        <circle className="fill" cx="10.468" cy="11.35" r="1"></circle>
        <circle className="fill" cx="14.532" cy="11.35" r="1"></circle>
        <circle className="fill" cx="10.468" cy="8.3" r="1"></circle>
        <circle className="fill" cx="14.532" cy="8.3" r="1"></circle>
      </svg>
    </div>
  )
}
