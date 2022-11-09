import React from 'react'

import './Footer.css'
import Proptypes from 'prop-types'

import TasksFilter from '../TasksFilter'

function Footer({ doneCount, showAllItems, showActiveItems, showDoneItems, onBtnDeleteDoneClick }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount}
{' '}
items left
</span>
      <TasksFilter showAllItems={showAllItems} showActiveItems={showActiveItems} showDoneItems={showDoneItems} />
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
  showAllItems: () => {},
  showActiveItems: () => {},
  showDoneItems: () => {},
  onBtnDeleteDoneClick: () => {},
}
Footer.propTypes = {
  doneCount: Proptypes.number,
  showAllItems: Proptypes.func,
  showActiveItems: Proptypes.func,
  showDoneItems: Proptypes.func,
  onBtnDeleteDoneClick: Proptypes.func,
}

export default Footer
