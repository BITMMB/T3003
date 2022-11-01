import React from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";

export const App = () => {
  return (
    <div className="todoapp">
      <NewTaskForm />
      <TaskList />
    </div>
  );
};

export default App;
