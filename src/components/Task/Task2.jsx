import React, { Component } from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

export default class Ttem extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      classNames: '',
      timerTurn: false,
      timerSec: 0,
    }
  }

  // timerSec: new Date().setMinutes(this.props.min, this.props.sec),
  timerStart(e) {
    console.log(this.props.min)
    if (e === 1) {
      this.setState({ timerTurn: true })
      console.log(this.state.timerTurn)
    } else if (e === 2) {
      this.setState({ timerTurn: false })
      console.log(this.state.timerTurn)
    }
  }

  componentDidMount() {
    if (this.state.timerSec == 0) {
      this.setState(() => {
        return { timerSec: new Date().setMinutes(this.props.min, this.props.sec) }
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
    let sec = this.state.timerSec - 1000
    this.setState({
      timerSec: sec,
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
                {format(this.state.timerSec, 'm:ss')}
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
