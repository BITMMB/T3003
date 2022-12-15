import React, { useState } from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer/Timer'

function Task({ id, time, msec, label, completed, changeTime, changeLabel, onBtnDoneClick, onBtnDeleteClick }) {
  const [text, setText] = useState(label)
  const [classNames, setClassNames] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  const onBtnEditClick = () => {
    setClassNames('editing')
  }
  return (
    <li className={completed ? 'completed' : classNames}>
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
            {text}
          </button>
          <div className="timer-date">
            <Timer msec={msec} completed={completed} id={id} changeTime={changeTime} />
            <span className="created">{formatDistanceToNow(time, { includeSeconds: true })}</span>
          </div>
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
        onSubmit={(e) => {
          e.preventDefault()
          setClassNames('')
          changeLabel(text, id)
        }}
      >
        <input type="text" className="edit" onChange={onChange} defaultValue={label} />
      </form>
    </li>
  )
}

export default Task

Task.defaultProps = {
  label: '',
  changeLabel: () => {},
  completed: false,
  onBtnDoneClick: () => {},
  onBtnEditClick: () => {},
  onBtnDeleteClick: () => {},
}

Task.propTypes = {
  label: PropTypes.string,
  changeLabel: PropTypes.func,
  completed: PropTypes.bool,
  onBtnDoneClick: PropTypes.func,
  onBtnEditClick: PropTypes.func,
  onBtnDeleteClick: PropTypes.func,
}
