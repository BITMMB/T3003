import React, { useState } from 'react'
import './TasksFilter.css'
import Proptypes from 'prop-types'

function TasksFilter({ filter }) {
  const [filters, setFilter] = useState('All')

  /// переключение стилей тройной кнопки
  const btnStyleToggle = (e) => {
    const { id } = e.target
    switch (id) {
      case 'all':
        setFilter('All')
        break
      case 'active':
        setFilter('Active')
        break
      case 'complited':
        setFilter('Complited')
        break
    }
  }

  return (
    <ul className="filters">
      <li>
        <button
          id="all"
          className={filters == 'All' ? 'selected' : ''}
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
          className={filters == 'Active' ? 'selected' : ''}
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
          className={filters == 'Complited' ? 'selected' : ''}
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
