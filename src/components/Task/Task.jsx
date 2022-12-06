import React, { Component } from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer/Timer'

export default class Ttem extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      classNames: '',
    }
  }

  onChange = (e) => {
    e.preventDefault()
    this.setState({
      label: e.target.value,
    })
  }

  onBtnEditClick = () => {
    this.setState({
      classNames: 'editing',
    })
  }

  render() {
    let { id, time, min, sec, label, completed, changeLabel, onBtnDoneClick, onBtnDeleteClick } = this.props

    return (
      <li className={completed ? 'completed' : this.state.classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed ? true : false}
            onChange={() => {
              onBtnDoneClick
            }}
            onClick={() => {
              onBtnDoneClick()
            }}
          />
          <label className="label">
            <button
              onClick={() => {
                onBtnDoneClick()
              }}
              className="description"
            >
              {label}
            </button>
            <div className="timer-date">
              <Timer min={min} sec={sec} completed={completed} />
              <span className="created">{formatDistanceToNow(time, { includeSeconds: true })}</span>
            </div>
          </label>

          <button
            className="icon icon-edit"
            onClick={() => {
              this.onBtnEditClick()
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
          onSubmit={(e) => {
            e.preventDefault()
            this.setState({
              classNames: '',
            })
            changeLabel(this.state.label, id)
          }}
        >
          <input type="text" className="edit" onChange={this.onChange} defaultValue={label} />
        </form>
      </li>
    )
  }
}
Ttem.defaultProps = {
  label: '',
  changeLabel: () => {},
  completed: false,
  onBtnDoneClick: () => {},
  onBtnEditClick: () => {},
  onBtnDeleteClick: () => {},
}

Ttem.propTypes = {
  label: PropTypes.string,
  changeLabel: PropTypes.func,
  completed: PropTypes.bool,
  onBtnDoneClick: PropTypes.func,
  onBtnEditClick: PropTypes.func,
  onBtnDeleteClick: PropTypes.func,
}
