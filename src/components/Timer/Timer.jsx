import React, { useEffect, useState } from 'react'

function Timer({ msec, completed, changeTime, id }) {
  const [timerTurn, setTimerTurn] = useState(false)
  const [timerMilisec, setTimerMilisec] = useState(0)
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
    if (timerMilisec == 0) {
      setTimerMilisec(msec)
    }
    if (!timerTurn) {
      return
    }
    timerID = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerID)
    }
  })

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  const tick = () => {
    if (timerMilisec == 0) {
      return
    } else {
      setTimerMilisec(() => {
        return timerMilisec - 1000
      })
    }
    changeTime(timerMilisec - 1000, id)
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
      {millisToMinutesAndSeconds(timerMilisec)}
    </span>
  )
}
export default Timer
