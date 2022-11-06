import React from "react";
import "./TasksFilter.css";
import Proptypes from "prop-types";

export default class TasksFilter extends React.Component {
  static defaultProps = {
    showAllItems: () => {},
    showActiveItems: () => {},
    showDoneItems: () => {},
  };

  static propTypes = {
    showAllItems: Proptypes.func,
    showActiveItems: Proptypes.func,
    showDoneItems: Proptypes.func,
  };

  state = {
    all: true,
    active: false,
    complited: false,
  };
  ///переключение стилей тройной кнопки
  btnStyleToggle = (e) => {
    let id = e.target.id;
    this.setState(() => {
      let newState = JSON.parse(JSON.stringify(this.state));
      for (let g in newState) {
        newState[g] = false;
        if (g === id) {
          newState[id] = true;
        }
      }
      return newState;
    });
  };

  render() {
    const { showAllItems, showActiveItems, showDoneItems } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            id={"all"}
            className={this.state.all ? "selected" : ""}
            onClick={(e) => {
              showAllItems();
              this.btnStyleToggle(e);
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            id={"active"}
            className={this.state.active ? "selected" : ""}
            onClick={(e) => {
              showActiveItems();
              this.btnStyleToggle(e);
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            id={"complited"}
            className={this.state.complited ? "selected" : ""}
            onClick={(e) => {
              showDoneItems();
              this.btnStyleToggle(e);
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
