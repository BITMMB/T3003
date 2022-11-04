import React, { Component } from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";

export default class App extends Component {
  state = {
    data: [
      { label: "label1", completed: false, editing: false, id: 1 },
      { label: "label2", completed: true, editing: false, id: 2 },
      { label: "label3", completed: false, editing: true, id: 3 },
    ],
  };

  onDelited = (id) => {
    this.setState(({ data }) => {
      const newState = data.filter((element) => {
        return element.id !== id;
      });
      return { data: newState };
    });
  };

  render() {
    return (
      <div className="todoapp">
        <NewTaskForm />
        <TaskList data={this.state.data} onDelited={this.onDelited} />
      </div>
    );
  }
}
