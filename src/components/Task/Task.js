import React from "react";
import "./Task.css";
import { Component } from "react";

export default class Ttem extends Component {
  state = {
    editing: false,
    completed: false,
  };

  onBtnEditClick = () => {
    this.setState({
      editing: true,
    });
  };
  onBtnDoneClick = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed,
      };
    });
  };

  render() {
    const { label, onDelited } = this.props;

    const { editing, completed } = this.state;

    let classNames = "";
    if (editing) {
      classNames = "editing";
    } else if (completed) {
      classNames = "completed";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={this.onBtnDoneClick}
          ></input>
          <label>
            <span className="description">{label}</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={this.onBtnEditClick}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              onDelited();
            }}
          ></button>
        </div>
      </li>
    );
  }
}

// editing;
// completed;
