import React from 'react'
import './TaskList.css'
import Proptypes from 'prop-types'

import Task from '../Task'
import Footer from '../Footer'

function TaskList({
  data,
  changeTime,
  doneCount,
  onBtnDeleteClick,
  onBtnDeleteDoneClick,
  onBtnDoneClick,
  onBtnEditClick,
  changeLabel,
  filter,
}) {
  const element = data.map((item) => (
    <Task
      {...item}
      changeTime={changeTime}
      key={item.id}
      onBtnDeleteClick={() => {
        onBtnDeleteClick(item.id)
      }}
      onBtnDoneClick={() => {
        onBtnDoneClick(item.id)
      }}
      onBtnEditClick={() => {
        onBtnEditClick(item.id)
      }}
      changeLabel={changeLabel}
    />
  ))

  return (
    <section className="main">
      <ul className="todo-list">{element}</ul>
      <Footer doneCount={doneCount} filter={filter} onBtnDeleteDoneClick={onBtnDeleteDoneClick} />
    </section>
  )
}

TaskList.defaultProps = {
  data: {},
  doneCount: 0,
  onBtnDeleteClick: () => {},
  onBtnDeleteDoneClick: () => {},
  onBtnDoneClick: () => {},
  onBtnEditClick: () => {},
  changeLabel: () => {},
  filter: () => {},
}

TaskList.propTypes = {
  data: Proptypes.arrayOf(Proptypes.object),
  doneCount: Proptypes.number,
  onBtnDeleteClick: Proptypes.func,
  onBtnDeleteDoneClick: Proptypes.func,
  onBtnDoneClick: Proptypes.func,
  onBtnEditClick: Proptypes.func,
  changeLabel: Proptypes.func,
  filter: Proptypes.func,
}

export default TaskList
