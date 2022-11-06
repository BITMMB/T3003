import React from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {
  state = {
    label: "",
  };
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addNewItem(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.label}
          ></input>
        </form>
      </header>
    );
  }
}
