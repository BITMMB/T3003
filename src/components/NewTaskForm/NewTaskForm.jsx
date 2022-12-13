import React, { useState } from 'react'
import './NewTaskForm.css'
import Proptypes from 'prop-types'

function NewTaskForm({ addNewItem }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setLabel(e.target.value)
  }
  const onChangeMin = (e) => {
    e.preventDefault()
    setMin(e.target.value)
  }
  const onChangeSec = (e) => {
    e.preventDefault()
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      let str = label.trim()
      let m = Number(min.trim())
      let s = Number(sec.trim())
      let regexp = /\d*\d/
      if (str.length == 0 || !regexp.test(m) || !regexp.test(s) || m > 59 || m < 0 || s > 59 || s < 0) {
        return
      } else if (label) addNewItem(str, m, s)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onKeyUp={onSubmit} onSubmit={onSubmit} className="new-todo-form">
        <input
          onChange={onChange}
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
          name={'label'}
        />

        <input onChange={onChangeMin} value={min} className="new-todo-form__timer" placeholder="Min" name={'min'} />
        <input onChange={onChangeSec} value={sec} className="new-todo-form__timer" placeholder="Sec" name={'sec'} />
      </form>
    </header>
  )
}
export default NewTaskForm
NewTaskForm.defaultProps = {
  addNewItem: () => {},
}

NewTaskForm.propTypes = {
  addNewItem: Proptypes.func,
}
