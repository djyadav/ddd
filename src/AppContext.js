import React, { useState } from "react";

const AppContext = React.createContext();
const data = {
  "to-do": [
    {
      content: "hello5",
      id: "1",
    },
    {
      content: "hello1",
      id: "4",
    },
    {
      content: "hello2",
      id: "5",
    },
  ],
  "in-progress": [
    {
      content: "hell33o",
      id: "2",
    },
  ],
  done: [
    {
      content: "hello3",
      id: "3",
    },
  ],
};
const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(data);
  const updateTask = (taskId, { column, ...value }) => {
    const columnTasks = [...tasks[column]];
    const index = columnTasks.findIndex(({ id }) => id === taskId);
    if (index > -1) {
      columnTasks[index] = { ...columnTasks[index], ...value };
      const updatedTasks = { ...tasks, [column]: columnTasks };
      setTasks(updatedTasks);
      return true;
    }
    return false;
  };
  const deleteTask = (taskId, { column }) => {
    const columnTasks = [...tasks[column]].filter(({ id }) => id !== taskId);
    const updatedTasks = { ...tasks, [column]: columnTasks };
    setTasks(updatedTasks);
  };
  const addTask = ({ column }) => {
    const columnTasks = [
      { content: "New", id: Date.now(), editing: true },
      ...tasks[column],
    ];
    const updatedTasks = { ...tasks, [column]: columnTasks };
    setTasks(updatedTasks);
  };

  const updateTasks = (tasks) => {
    setTasks(tasks);
  };
  const context = {
    tasks,
    updateTasks,
    task: { update: updateTask, delete: deleteTask, add: addTask },
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
