import React from 'react'
import './TasksFilter.css'
import Proptypes from 'prop-types'

export default class TasksFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      all: true,
      active: false,
      complited: false,
    }
  }

  /// переключение стилей тройной кнопки
  btnStyleToggle = (e) => {
    const { id } = e.target
    this.setState(() => {
      const newState = JSON.parse(JSON.stringify(this.state))
      for (const g in newState) {
        newState[g] = false
        if (g === id) {
          newState[id] = true
        }
      }
      return newState
    })
  }

  render() {
    const { filter } = this.props
    return (
      <ul className="filters">
        <li>
          <button
            id="all"
            className={this.state.all ? 'selected' : ''}
            onClick={(e) => {
              filter(e)
              this.btnStyleToggle(e)
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            id="active"
            className={this.state.active ? 'selected' : ''}
            onClick={(e) => {
              filter(e)
              this.btnStyleToggle(e)
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            id="complited"
            className={this.state.complited ? 'selected' : ''}
            onClick={(e) => {
              filter(e)

              this.btnStyleToggle(e)
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
TasksFilter.defaultProps = {
  filter: () => {},
}

TasksFilter.propTypes = {
  filter: Proptypes.func,
}
