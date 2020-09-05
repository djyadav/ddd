import React, { useState } from "react";

const AppContext = React.createContext();
const data = {
  "to-do": [
    {
      content: "hello5",
      id: "1",
      board: "to-do",
    },
    {
      content: "hello1",
      id: "4",
      board: "to-do",
    },
    {
      content: "hello2",
      id: "5",
      board: "to-do",
    },
  ],
  "in-progress": [
    {
      content: "hell33o",
      id: "2",
      board: "in-progress",
    },
  ],
  done: [
    {
      content: "hello3",
      id: "3",
      board: "done",
    },
  ],
};
const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(data);
  const updateTask = (taskId, value) => {
    const index = tasks.findIndex(({ id }) => id === taskId);
    console.log("tasks", taskId, value);
    if (index > -1) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = { ...updatedTasks[index], ...value };
      setTasks(updatedTasks);
      return true;
    }
    return false;
  };
  const deleteTask = (taskId) => {
    const index = tasks.findIndex(({ id }) => id === taskId);
    if (index > -1) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      return true;
    }
    return false;
  };
  const updateTasks = (tasks) => {
    setTasks(tasks);
  };
  const context = {
    tasks,
    updateTasks,
    task: { update: updateTask, delete: deleteTask },
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
