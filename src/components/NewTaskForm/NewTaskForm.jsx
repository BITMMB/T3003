import React from 'react'
import './NewTaskForm.css'
import Proptypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onChange = (e) => {
    e.preventDefault()
    this.setState({
      label: e.target.value,
    })
  }
  onChangeMin = (e) => {
    e.preventDefault()
    this.setState({
      min: e.target.value,
    })
  }
  onChangeSec = (e) => {
    e.preventDefault()
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      let { label, min, sec } = this.state
      e.preventDefault()
      let str = label.trim()
      let m = Number(min.trim())
      let s = Number(sec.trim())
      let regexp = /\d*\d/
      if (str.length == 0 || !regexp.test(m) || !regexp.test(s) || m > 59 || m < 0 || s > 59 || s < 0) {
        return
      } else if (label) this.props.addNewItem(str, m, s)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onKeyUp={this.onSubmit} onSubmit={this.onSubmit} className="new-todo-form">
          <input
            onChange={this.onChange}
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.label}
            name={'label'}
          />

          <input
            onChange={this.onChangeMin}
            value={this.state.min}
            className="new-todo-form__timer"
            placeholder="Min"
            name={'min'}
          />
          <input
            onChange={this.onChangeSec}
            value={this.state.sec}
            className="new-todo-form__timer"
            placeholder="Sec"
            name={'sec'}
          />
        </form>
      </header>
    )
  }
}
NewTaskForm.defaultProps = {
  addNewItem: () => {},
}

NewTaskForm.propTypes = {
  addNewItem: Proptypes.func,
}
