import React, { useState } from 'react'
import './TasksFilter.css'
import Proptypes from 'prop-types'

function TasksFilter({ filter }) {
  const [filterAll, setFilterAll] = useState(true)
  const [filterActive, setFilterActive] = useState(false)
  const [filterComplited, setFilterComplited] = useState(false)
  // constructor() {
  //   super()
  //   this.state = {
  //     all: true,
  //     active: false,
  //     complited: false,
  //   }
  // }

  /// переключение стилей тройной кнопки
  const btnStyleToggle = (e) => {
    const { id } = e.target
    switch (id) {
      case 'all':
        setFilterAll(true), setFilterActive(false), setFilterComplited(false)
        break
      case 'active':
        setFilterAll(false), setFilterActive(true), setFilterComplited(false)
        break
      case 'complited':
        setFilterAll(false), setFilterActive(false), setFilterComplited(true)
        break
    }
  }

  return (
    <ul className="filters">
      <li>
        <button
          id="all"
          className={filterAll ? 'selected' : ''}
          onClick={(e) => {
            filter(e)
            btnStyleToggle(e)
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          id="active"
          className={filterActive ? 'selected' : ''}
          onClick={(e) => {
            filter(e)
            btnStyleToggle(e)
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          id="complited"
          className={filterComplited ? 'selected' : ''}
          onClick={(e) => {
            filter(e)
            btnStyleToggle(e)
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
export default TasksFilter
TasksFilter.defaultProps = {
  filter: () => {},
}

TasksFilter.propTypes = {
  filter: Proptypes.func,
}
