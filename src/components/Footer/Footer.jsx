import React from 'react'
import './Footer.css'
import Proptypes from 'prop-types'

import TasksFilter from '../TasksFilter'

function Footer({ doneCount, filter, onBtnDeleteDoneClick }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {doneCount}
        items left
      </span>
      <TasksFilter filter={filter} />
      <button
        className="clear-completed"
        onClick={() => {
          onBtnDeleteDoneClick()
        }}
      >
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  doneCount: 0,
  filter: () => {},
  onBtnDeleteDoneClick: () => {},
}
Footer.propTypes = {
  doneCount: Proptypes.number,
  filter: Proptypes.func,
  onBtnDeleteDoneClick: Proptypes.func,
}

export default Footer
