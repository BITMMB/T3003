import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        // {
        //   label: 'Сall friends',
        //   completed: false,
        //   time: 1667438871001,
        //   id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        // },
        // {
        //   label: 'Have a beer',
        //   completed: false,
        //   time: 1667538871002,
        //   id: '1b9d6bcd-bbfd-4b2d-9b6d-ab8dfbbd4bed',
        // },
        // {
        //   label: 'Suffer tomorrow morning',
        //   completed: false,
        //   time: 1667736871003,
        //   id: '1b9d6bcd-bbfd-4b2d-9b4d-ab8dfbbd4bed',
        // },
      ],

      filter: { all: true, active: false, complited: false },
    }
  }
  /// изменение элемента на сделано
  onBtnDoneClick = (id) => {
    this.setState(({ data }) => {
      let newState = data.map((element) => {
        if (element.id === id) {
          return { ...element, completed: !element.completed }
        }
        return element
      })
      return { data: newState }
    })
  }

  /// добавление нового элемента
  addNewItem = (label, m, s) => {
    this.setState(({ data }) => {
      let newState = [...data]
      newState.push({
        label,
        completed: false,
        id: uuidv4(),
        time: Date.parse(new Date()),
        min: m,
        sec: s,
      })
      return { data: newState }
    })
  }

  /// удаление элемента
  onBtnDeleteClick = (id) => {
    this.setState(({ data }) => {
      let newState = data.filter((element) => element.id !== id)
      return { data: newState }
    })
  }

  /// удаление выполненных элементов
  onBtnDeleteDoneClick = () => {
    this.setState(({ data }) => {
      let newState = data.filter((element) => !element.completed)
      return { data: newState }
    })
  }
  ///сабмит отредактированного
  changeLabel = (label, id) => {
    this.setState(({ data }) => {
      let newState = data.map((element) => {
        if (label.length == 0) {
          return element()
        }
        if (element.id === id) {
          return { ...element, label: label }
        }
        return element
      })
      return { data: newState }
    })
  }
  ///фильтр нижних кнопок
  filter = (e) => {
    const { id } = e.target
    this.setState(() => {
      const newState = this.state.filter
      for (const g in newState) {
        newState[g] = false
        if (g === id) {
          newState[id] = true
        }
      }
      return newState
    })
  }

  render() {
    /// счетчик количества не выполненных
    let data = this.state.data
    const doneCount = data.filter((el) => !el.completed).length

    ///фильтр нижних кнопок
    data = data.filter((element) => {
      if (this.state.filter.complited && element.completed) {
        return true
      } else if (this.state.filter.active && !element.completed) {
        return true
      } else if (this.state.filter.all) {
        return true
      }
    })

    return (
      <div className="todoapp">
        <NewTaskForm addNewItem={this.addNewItem} />
        <TaskList
          data={data}
          doneCount={doneCount}
          onBtnDeleteClick={this.onBtnDeleteClick}
          onBtnDeleteDoneClick={this.onBtnDeleteDoneClick}
          onBtnDoneClick={this.onBtnDoneClick}
          onBtnEditClick={this.onBtnEditClick}
          changeLabel={this.changeLabel}
          filter={this.filter}
        />
      </div>
    )
  }
}
