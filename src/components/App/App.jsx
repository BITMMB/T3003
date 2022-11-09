import React, { Component } from 'react'
import './App.css'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          label: 'Сall friends',
          done: false,
          completed: false,
          editing: false,
          toggleall: false,
          id: 1667438871000,
        },
        {
          label: 'Have a beer',
          done: false,
          completed: false,
          editing: false,
          toggleall: false,
          id: 1667538871000,
        },
        {
          label: 'Suffer tomorrow morning',
          done: false,
          completed: false,
          editing: false,
          toggleall: false,
          id: 1667736871000,
        },
      ],
    }
  }

  /// добавление нового элемента
  addNewItem = (label) => {
    this.setState(({ data }) => {
      const newState = JSON.parse(JSON.stringify(data))
      newState.push({
        label,
        done: false,
        completed: false,
        editing: false,
        toggleall: false,
        id: Date.parse(new Date()),
      })
      return { data: newState }
    })
  }

  /// удаление элемента
  onBtnDeleteClick = (id) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.filter((element) => element.id !== id)
      return { data: newState }
    })
  }

  /// удаление выполненных элементов
  onBtnDeleteDoneClick = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.filter((element) => !element.completed)
      return { data: newState }
    })
  }

  /// элемент выполнен
  onBtnDoneClick = (id) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.map((element) => {
        if (element.id === id) {
          const exit = Object.assign(element)
          exit.completed = !element.completed
          return exit
        }
        return element
      })
      return { data: newState }
    })
  }

  /// редактирование элемента
  onBtnEditClick = (id) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.map((element) => {
        if (element.id === id) {
          const exit = Object.assign(element)
          exit.editing = !element.editing
          return exit
        }
        return element
      })
      return { data: newState }
    })
  }

  // сабмит отредактированного
  changeLabel = (label, itemId) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.map((element) => {
        if (element.id === itemId) {
          const exit = Object.assign(element)
          exit.label = label
          exit.editing = !element.editing
          return exit
        }
        return element
      })
      return { data: newState }
    })
  }

  /// показать все элементы
  showAllItems = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.map((element) => {
        const exit = Object.assign(element)
        exit.toggleall = false
        return exit
      })
      return { data: newState }
    })
  }

  /// показать активные элементы
  showActiveItems = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.map((element) => {
        const exit = Object.assign(element)
        if (element.completed) {
          exit.toggleall = true
          return exit
        }
        exit.toggleall = false
        return exit
      })
      return { data: newState }
    })
  }

  /// показать выполненные элементы
  showDoneItems = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data))
      newState = newState.map((element) => {
        const exit = Object.assign(element)
        if (!element.completed) {
          exit.toggleall = true
          return exit
        }
        exit.toggleall = false
        return exit
      })
      return { data: newState }
    })
  }

  render() {
    /// счетчик количества не выполненных
    const { data } = this.state
    const doneCount = data.length - data.filter((el) => el.completed).length

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
          showAllItems={this.showAllItems}
          showActiveItems={this.showActiveItems}
          showDoneItems={this.showDoneItems}
        />
      </div>
    )
  }
}
