import React from "react";
import "./Task.css";
import { Component } from "react";
import Proptypes from "prop-types";
import { formatDistanceToNow, subDays } from "date-fns";

export default class Ttem extends Component {
  static defaultProps = {
    itemId: 0,
    label: "",
    editing: false,
    changeLabel: () => {},
    completed: false,
    toggleall: false,
    onBtnDoneClick: () => {},
    onBtnEditClick: () => {},
    onBtnDeleteClick: () => {},
  };

  static propTypes = {
    label: Proptypes.string,
    editing: Proptypes.bool,
    changeLabel: Proptypes.func,
    completed: Proptypes.bool,
    toggleall: Proptypes.bool,
    onBtnDoneClick: Proptypes.func,
    onBtnEditClick: Proptypes.func,
    onBtnDeleteClick: Proptypes.func,
  };

  state = {
    label: "",
  };
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    const {
      itemId,
      label,
      editing,
      changeLabel,
      completed,
      toggleall,
      onBtnDoneClick,
      onBtnEditClick,
      onBtnDeleteClick,
    } = this.props;

    let classNames = "";
    if (toggleall) {
      classNames = "toggle-all";
    } else if (editing) {
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
            onClick={() => {
              onBtnDoneClick();
            }}
          ></input>
          <label>
            <span className="description">{label}</span>

            <span className="created">
              {formatDistanceToNow(itemId, { includeSeconds: true })}
            </span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              onBtnEditClick();
            }}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              onBtnDeleteClick();
            }}
          ></button>
        </div>

        <form
          onSubmit={() => {
            changeLabel(this.state.label, itemId);
          }}
        >
          <input
            type="text"
            className="edit"
            onChange={this.onChange}
            defaultValue={label}
          ></input>
        </form>
      </li>
    );
  }
}
