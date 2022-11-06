import React, { Component } from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";

export default class App extends Component {
  state = {
    data: [
      {
        label: "label1",
        done: false,
        completed: false,
        editing: false,
        toggleall: false,
        id: 1,
      },
      {
        label: "label2",
        done: false,
        completed: false,
        editing: false,
        toggleall: false,
        id: 2,
      },
      {
        label: "label3",
        done: false,
        completed: false,
        editing: false,
        toggleall: false,
        id: 3,
      },
    ],
  };
  ///добавление нового элемента
  addNewItem = (label) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState.push({
        label: label,
        done: false,
        completed: false,
        editing: false,
        toggleall: false,
        id: 3,
      });
      return { data: newState };
    });
  };
  ///удаление элемента
  onBtnDeleteClick = (id) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.filter((element) => {
        return element.id !== id;
      });
      return { data: newState };
    });
  };
  ///удаление выполненных элементов
  onBtnDeleteDoneClick = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.filter((element) => {
        return !element.completed;
      });
      return { data: newState };
    });
  };

  /// элемент выполнен
  onBtnDoneClick = (id) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.map((element) => {
        if (element.id === id) {
          element.completed = !element.completed;
          return element;
        }
        return element;
      });
      return { data: newState };
    });
  };
  /// редактирование элемента
  onBtnEditClick = (id) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.map((element) => {
        if (element.id === id) {
          element.editing = !element.editing;
          return element;
        }
        return element;
      });
      return { data: newState };
    });
  };
  //сабмит отредактированного
  changeLabel = (label, itemId) => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.map((element) => {
        if (element.id === itemId) {
          element.label = label;
          element.editing = !element.editing;
          return element;
        }
        return element;
      });
      return { data: newState };
    });
  };

  ///показать все элементы
  showAllItems = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.map((element) => {
        element.toggleall = false;
        return element;
      });
      return { data: newState };
    });
  };
  ///показать активные элементы
  showActiveItems = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.map((element) => {
        if (element.completed) {
          element.toggleall = true;
          return element;
        }
        element.toggleall = false;
        return element;
      });
      return { data: newState };
    });
  };
  ///показать выполненные элементы
  showDoneItems = () => {
    this.setState(({ data }) => {
      let newState = JSON.parse(JSON.stringify(data));
      newState = newState.map((element) => {
        if (!element.completed) {
          element.toggleall = true;
          return element;
        }
        element.toggleall = false;
        return element;
      });
      return { data: newState };
    });
  };

  render() {
    ///счетчик количества не выполненных
    let doneCount =
      this.state.data.length -
      this.state.data.filter((el) => {
        return el.completed;
      }).length;

    return (
      <div className="todoapp">
        <NewTaskForm addNewItem={this.addNewItem} />
        <TaskList
          data={this.state.data}
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
    );
  }
}
