import React from "react";
import "./TaskList.css";
import Task from "../Task";
import Footer from "../Footer";

const TaskList = ({ data, onDelited }) => {
  const element = data.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        onDelited={() => {
          onDelited(item.id);
        }}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{element}</ul>
      <Footer />
    </section>
  );
};
export default TaskList;
