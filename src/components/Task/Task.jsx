import React, { Component } from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Ttem extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
    }
  }

  onChange = (e) => {
    e.preventDefault()
    this.setState({
      label: e.target.value,
    })
  }

  render() {
    const {
      itemId,
      label,
      editing,
      changeLabel,
      completed,
      toggleall,
      onBtnDoneClick,
      onBtnEditClick,
      onBtnDeleteClick,
    } = this.props

    let classNames = ''
    if (toggleall) {
      classNames = 'toggle-all'
    } else if (editing) {
      classNames = 'editing'
    } else if (completed) {
      classNames = 'completed'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={() => {
              onBtnDoneClick()
            }}
          />
          <label>
            <span className="description">{label}</span>

            <span className="created">{formatDistanceToNow(itemId, { includeSeconds: true })}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              onBtnEditClick()
            }}
          />
          <button
            className="icon icon-destroy"
            onClick={() => {
              onBtnDeleteClick()
            }}
          />
        </div>

        <form
          onSubmit={() => {
            changeLabel(this.state.label, itemId)
          }}
        >
          <input type="text" className="edit" onChange={this.onChange} defaultValue={label} />
        </form>
      </li>
    )
  }
}
Ttem.defaultProps = {
  itemId: 0,
  label: '',
  editing: false,
  changeLabel: () => {},
  completed: false,
  toggleall: false,
  onBtnDoneClick: () => {},
  onBtnEditClick: () => {},
  onBtnDeleteClick: () => {},
}

Ttem.propTypes = {
  itemId: PropTypes.number,
  label: PropTypes.string,
  editing: PropTypes.bool,
  changeLabel: PropTypes.func,
  completed: PropTypes.bool,
  toggleall: PropTypes.bool,
  onBtnDoneClick: PropTypes.func,
  onBtnEditClick: PropTypes.func,
  onBtnDeleteClick: PropTypes.func,
}
