import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

function App() {
  const [data, setData] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const [filters, setFilter] = useState('All')

  useEffect(() => {
    dFilter(data)
  }, [data, filters])

  const dFilter = (data) => {
    data = data.filter((element) => {
      if (filters == 'Complited' && element.completed) {
        return true
      } else if (filters == 'Active' && !element.completed) {
        return true
      } else if (filters == 'All') {
        return true
      }
    })
    setDataFilter(data)
  }

  const changeTime = (ms, id) => {
    let newState = data.map((element) => {
      if (element.id === id) {
        return { ...element, msec: ms }
      }
      return element
    })
    setData(newState)
  }

  /// изменение элемента на сделано
  const onBtnDoneClick = (id) => {
    let newState = data.map((element) => {
      if (element.id === id) {
        return { ...element, completed: !element.completed }
      }
      return element
    })
    setData(newState)
  }

  /// добавление нового элемента

  const addNewItem = (label, m, s) => {
    console.log(m * 60000 + s * 1000)
    let newState = [...data]
    newState.push({
      label,
      completed: false,
      id: uuidv4(),
      time: Date.parse(new Date()),
      // min: m,
      // sec: s,
      msec: m * 60000 + s * 1000,
    })

    setData(newState)
  }

  /// удаление элемента
  const onBtnDeleteClick = (id) => {
    setData(data.filter((element) => element.id !== id))
  }

  /// удаление выполненных элементов
  const onBtnDeleteDoneClick = () => {
    setData(data.filter((element) => !element.completed))
  }
  ///сабмит отредактированного
  const changeLabel = (label, id) => {
    let newState = data.map((element) => {
      if (label.length == 0) {
        return element()
      }
      if (element.id === id) {
        return { ...element, label: label }
      }
      return element
    })
    setData(newState)
  }

  const filter = (e) => {
    const { id } = e.target
    switch (id) {
      case 'all':
        setFilter('All')
        break
      case 'active':
        setFilter('Active')
        break
      case 'complited':
        setFilter('Complited')
        break
    }
  }

  /// счетчик количества не выполненных

  const doneCount = data.filter((el) => !el.completed).length

  return (
    <div className="todoapp">
      <NewTaskForm addNewItem={addNewItem} />
      <TaskList
        data={dataFilter}
        doneCount={doneCount}
        changeTime={changeTime}
        onBtnDeleteClick={onBtnDeleteClick}
        onBtnDeleteDoneClick={onBtnDeleteDoneClick}
        onBtnDoneClick={onBtnDoneClick}
        changeLabel={changeLabel}
        filter={filter}
      />
    </div>
  )
}
export default App
