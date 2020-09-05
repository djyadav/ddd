import React, { useState, useEffect } from "react";
import { localStore } from "utils";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(localStore.get("tasks"));
  const [columns, setColumns] = useState(localStore.get("tasks"));
  useEffect(() => {
    localStore.update("tasks", columns);
  }, [columns]);

  const updateTask = (taskId, { column: columnId, ...value }) => {
    const columnIndex = columns.findIndex(({ id }) => id === columnId);
    const columnTasks = [...columns[columnIndex].tasks];
    const index = columnTasks.findIndex(({ id }) => id === taskId);
    if (index > -1) {
      columnTasks[index] = { ...columnTasks[index], ...value };
      const updatedColumns = [...columns];
      columns[columnIndex].tasks = columnTasks;
      setColumns(updatedColumns);
    }
  };

  const deleteTask = (taskId, { column: columnId }) => {
    const columnIndex = columns.findIndex(({ id }) => id === columnId);
    const columnTasks = [...columns[columnIndex].tasks].filter(
      ({ id }) => id !== taskId
    );
    const updatedColumns = [...columns];
    columns[columnIndex].tasks = columnTasks;
    setColumns(updatedColumns);
  };

  const addTask = ({ column: columnId }) => {
    const columnIndex = columns.findIndex(({ id }) => id === columnId);
    const columnTasks = [
      { content: "New", id: String(Date.now()), editing: true },
      ...columns[columnIndex].tasks,
    ];

    const updatedColumns = [...columns];
    columns[columnIndex].tasks = columnTasks;
    setColumns(updatedColumns);
  };

  const updateTasks = (tasks) => {
    setTasks(tasks);
  };
  const updateColumn = (columnId, { title }) => {
    console.log("columns", columnId);
    const columnIndex = columns.findIndex(({ id }) => id === columnId);
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].title = title;
    setColumns(updatedColumns);
    // const columnTasks = [...tasks[column]]
    // const updatedTasks = { ...tasks};
    // delete updatedTasks[column];
    //
    // setTasks(updatedTasks);
  };
  const move = (source, destination) => {
    let updatedColumns = [...columns];
    if (source.droppableId === destination.droppableId) {
      const oldIndex = source.index;
      const newIndex = destination.index;

      const sourceColumnIndex = updatedColumns.findIndex(
        ({ id }) => id === source.droppableId
      );
      const destinationColumnIndex = updatedColumns.findIndex(
        ({ id }) => id === destination.droppableId
      );

      const arr = updatedColumns[sourceColumnIndex].tasks.slice();
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
      updatedColumns[sourceColumnIndex].tasks = arr;
    } else {
      const oldIndex = source.index;
      const newIndex = destination.index;

      const sourceColumnIndex = updatedColumns.findIndex(
        ({ id }) => id === source.droppableId
      );
      const destinationColumnIndex = updatedColumns.findIndex(
        ({ id }) => id === destination.droppableId
      );

      const sourceArr = updatedColumns[sourceColumnIndex].tasks.slice();
      const destinationArr = updatedColumns[
        destinationColumnIndex
      ].tasks.slice();

      destinationArr.splice(newIndex, 0, sourceArr.splice(oldIndex, 1)[0]);

      updatedColumns[sourceColumnIndex].tasks = sourceArr;
      updatedColumns[destinationColumnIndex].tasks = destinationArr;
      // updatedTasks[source.droppableId] = sourceArr;
      // updatedTasks[destination.droppableId] = destinationArr;
    }
    setColumns(updatedColumns);
  };
  const context = {
    columns,
    updateTasks,
    task: { update: updateTask, delete: deleteTask, move },
    column: { update: updateColumn, addTask },
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
