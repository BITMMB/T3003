import React from "react";
import "./TaskList.css";
import Task from "../Task";
import Footer from "../Footer";
import Proptypes from "prop-types";

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

TaskList.defaultProps = {
  data: {},
  doneCount: 0,
  onBtnDeleteClick: () => {},
  onBtnDeleteDoneClick: () => {},
  onBtnDoneClick: () => {},
  onBtnEditClick: () => {},
  changeLabel: () => {},
  showAllItems: () => {},
  showActiveItems: () => {},
  showDoneItems: () => {},
};

TaskList.propTypes = {
  data: Proptypes.arrayOf(Proptypes.object).isRequired,
  doneCount: Proptypes.number,
  onBtnDeleteClick: Proptypes.func,
  onBtnDeleteDoneClick: Proptypes.func,
  onBtnDoneClick: Proptypes.func,
  onBtnEditClick: Proptypes.func,
  changeLabel: Proptypes.func,
  showAllItems: Proptypes.func,
  showActiveItems: Proptypes.func,
  showDoneItems: Proptypes.func,
};

export default TaskList;
