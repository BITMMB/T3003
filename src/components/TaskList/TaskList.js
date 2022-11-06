import React from "react";
import "./TaskList.css";
import Task from "../Task";
import Footer from "../Footer";

const TaskList = ({
  data,
  doneCount,
  onBtnDeleteClick,
  onBtnDeleteDoneClick,
  onBtnDoneClick,
  onBtnEditClick,
  changeLabel,
  showAllItems,
  showActiveItems,
  showDoneItems,
}) => {
  const element = data.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        itemId={item.id}
        onBtnDeleteClick={() => {
          onBtnDeleteClick(item.id);
        }}
        onBtnDoneClick={() => {
          onBtnDoneClick(item.id);
        }}
        onBtnEditClick={() => {
          onBtnEditClick(item.id);
        }}
        changeLabel={changeLabel}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{element}</ul>
      <Footer
        doneCount={doneCount}
        showAllItems={showAllItems}
        showActiveItems={showActiveItems}
        showDoneItems={showDoneItems}
        onBtnDeleteDoneClick={onBtnDeleteDoneClick}
      />
    </section>
  );
};
export default TaskList;
