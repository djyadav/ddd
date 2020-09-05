import React from "react";
import { Task } from "components/";
import { Droppable, Draggable } from "react-beautiful-dnd";
const TaskList = ({ tasks = [], column }) => {
  return tasks.map((task, index) => {
    return <Task {...task} key={task.id} index={index} column={column} />;
  });
};
export default TaskList;
