import React, { useEffect, useState } from 'react'

function Timer({ min, sec, completed, changeTime, id }) {
  const [timerTurn, setTimerTurn] = useState(false)
  const [timerSec, setTimerSec] = useState(0)
  const [timerMin, setTimerMin] = useState(0)
  let timerID

  const timerStart = (e) => {
    if (e === 1 && !completed) {
      setTimerTurn(true)
    } else if (e === 2) {
      setTimerTurn(false), clearInterval(timerID)
    }
  }

  useEffect(() => {
    if (completed && timerTurn) {
      timerStart(2)
    }
    if (timerSec == 0) {
      setTimerSec(sec)
      setTimerMin(min)
    }
    if (!timerTurn) {
      return
    }
    timerID = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerID)
    }
  })

  const tick = () => {
    let min
    let sec
    if (timerSec == 0 && timerMin !== 0) {
      min = timerMin - 1
      sec = 59
    } else if (timerSec == 0 && timerMin == 0) {
      return
    } else {
      min = timerMin
      sec = timerSec - 1
    }
    setTimerSec(sec)
    setTimerMin(min)
    changeTime(min, sec, id)
  }

  return (
    <span className="timer">
      <button
        className="icon icon-play"
        onClick={() => {
          timerStart(1)
        }}
      ></button>
      <button
        className="icon icon-pause"
        onClick={() => {
          timerStart(2)
        }}
      ></button>
      {`${timerMin.toString().padStart(2, '0')}:${timerSec.toString().padStart(2, '0')}`}
    </span>
  )
}
export default Timer
