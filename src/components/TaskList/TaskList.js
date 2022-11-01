import React from "react";
import "./TaskList.css";
import Task from "../Task";
import Footer from "../Footer";

const TaskList = () => {
  return (
    <section className="main">
      <Task />
      <Footer />
    </section>
  );
};
export default TaskList;
