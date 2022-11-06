import React from "react";
import "./Footer.css";
import TasksFilter from "../TasksFilter";

const Footer = ({
  doneCount,
  showAllItems,
  showActiveItems,
  showDoneItems,
  onBtnDeleteDoneClick,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TasksFilter
        showAllItems={showAllItems}
        showActiveItems={showActiveItems}
        showDoneItems={showDoneItems}
      />
      <button
        className="clear-completed"
        onClick={() => {
          onBtnDeleteDoneClick();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
