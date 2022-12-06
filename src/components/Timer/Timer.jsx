import React, { Component } from 'react'
export default class Timer extends Component {
  constructor() {
    super()
    this.state = {
      timerTurn: false,
      timerSec: 0,
      timerMin: 0,
    }
  }

  timerStart(e) {
    if (e === 1 && !this.props.completed) {
      this.setState(() => {
        return { timerTurn: true }
      }, this.componentDidMount)
    } else if (e === 2) {
      this.setState(() => {
        return { timerTurn: false }
      }, clearInterval(this.timerID))
    }
  }

  componentDidUpdate() {
    if (this.props.completed && this.state.timerTurn) {
      this.timerStart(2)
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

  render() {
    return (
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
        {`${this.state.timerMin.toString().padStart(2, '0')}:${this.state.timerSec.toString().padStart(2, '0')}`}
      </span>
    )
  }
}
