import React from "react";
import { Task } from "components/";
import { Droppable, Draggable } from "react-beautiful-dnd";
const TaskList = ({ tasks = [] }) => {
  return tasks.map((task, index) => {
    return <Task {...task} key={task.id} index={index} />;
  });
};
export default TaskList;
