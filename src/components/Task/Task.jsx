import React, { Component } from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Ttem extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      classNames: '',
      timerTurn: false,
      timerSec: 0,
      timerMin: 0,
    }
  }

  timerStart(e) {
    if (e === 1) {
      this.setState(() => {
        return { timerTurn: true }
      }, this.componentDidMount)
    } else if (e === 2) {
      this.setState(() => {
        return { timerTurn: false }
      }, clearInterval(this.timerID))
    }
  }

  componentDidMount() {
    if (this.state.timerSec == 0) {
      this.setState(() => {
        return { timerSec: this.props.sec, timerMin: this.props.min }
      })
    }
    if (!this.state.timerTurn) {
      return
    }
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    let min
    let sec
    if (this.state.timerSec == 0 && this.state.timerMin !== 0) {
      min = this.state.timerMin - 1
      sec = 59
    } else if (this.state.timerSec == 0 && this.state.timerMin == 0) {
      return
    } else {
      min = this.state.timerMin
      sec = this.state.timerSec - 1
    }
    this.setState({
      timerSec: sec,
      timerMin: min,
    })
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
    let { id, time, label, completed, changeLabel, onBtnDoneClick, onBtnDeleteClick } = this.props

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
              <span className="timer">
                <button
                  className="icon icon-play"
                  onClick={() => {
                    this.timerStart(1)
                  }}
                ></button>
                <button
                  className="icon icon-pause"
                  onClick={() => {
                    this.timerStart(2)
                  }}
                ></button>
                {`${this.state.timerMin.toString().padStart(2, '0')}:${this.state.timerSec
                  .toString()
                  .padStart(2, '0')}`}
              </span>
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
