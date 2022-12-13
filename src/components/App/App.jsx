import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

function App() {
  const [data, setData] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const [filterAll, setFilterAll] = useState(true)
  const [filterActive, setFilterActive] = useState(false)
  const [filterComplited, setFilterComplited] = useState(false)

  let newState1 = []
  useEffect(() => {
    dFilter(data)
  }, [data, filterAll, filterActive, filterComplited])

  const dFilter = (data) => {
    setDataFilter(() => {
      newState1 = data.filter((element) => {
        if (filterComplited && element.completed) {
          return true
        } else if (filterActive && !element.completed) {
          return true
        } else if (filterAll) {
          return true
        }
      })
      return newState1
    })
  }

  const changeTime = (minN, secN, id) => {
    setData(() => {
      let newState = data.map((element) => {
        if (element.id === id) {
          return { ...element, min: minN, sec: secN }
        }
        return element
      })
      return newState
    })
  }

  /// изменение элемента на сделано
  const onBtnDoneClick = (id) => {
    setData(() => {
      let newState = data.map((element) => {
        if (element.id === id) {
          return { ...element, completed: !element.completed }
        }
        return element
      })
      return newState
    })
  }

  /// добавление нового элемента

  const addNewItem = (label, m, s) => {
    let newState
    setData(() => {
      newState = [...data]
      newState.push({
        label,
        completed: false,
        id: uuidv4(),
        time: Date.parse(new Date()),
        min: m,
        sec: s,
      })

      return newState
    })
  }
  /// удаление элемента
  const onBtnDeleteClick = (id) => {
    setData(() => {
      let newState = data.filter((element) => element.id !== id)
      return newState
    })
  }

  /// удаление выполненных элементов
  const onBtnDeleteDoneClick = () => {
    setData(() => {
      let newState = data.filter((element) => !element.completed)
      return newState
    })
  }
  ///сабмит отредактированного
  const changeLabel = (label, id) => {
    setData(() => {
      let newState = data.map((element) => {
        if (label.length == 0) {
          return element()
        }
        if (element.id === id) {
          return { ...element, label: label }
        }
        return element
      })
      return newState
    })
  }

  const filter = (e) => {
    const { id } = e.target
    switch (id) {
      case 'all':
        setFilterAll(true), setFilterActive(false), setFilterComplited(false)
        break
      case 'active':
        setFilterAll(false), setFilterActive(true), setFilterComplited(false)
        break
      case 'complited':
        setFilterAll(false), setFilterActive(false), setFilterComplited(true)
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
