import React, { useState, useEffect } from "react";
import { localStore } from "utils";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(localStore.get("tasks"));
  useEffect(() => {
    localStore.update("tasks", tasks);
  }, [tasks]);
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
      { content: "New", id: String(Date.now()), editing: true },
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
