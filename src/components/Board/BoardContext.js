import React, { useState, useEffect } from "react";
import { localStore } from "utils";
const BoardContext = React.createContext();

const BoardProvider = ({ children, DATA_REF }) => {
  const [columns, setColumns] = useState(localStore.get(DATA_REF) || []);
  useEffect(() => {
    localStore.update(DATA_REF, columns);
  }, [columns, DATA_REF]);

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

  const updateColumn = (columnId, { title }) => {
    const columnIndex = columns.findIndex(({ id }) => id === columnId);
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].title = title;
    setColumns(updatedColumns);
  };
  const move = (source, destination) => {
    let updatedColumns = [...columns];
    if (source.droppableId === destination.droppableId) {
      const oldIndex = source.index;
      const newIndex = destination.index;

      const sourceColumnIndex = updatedColumns.findIndex(
        ({ id }) => id === source.droppableId
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
    }
    setColumns(updatedColumns);
  };
  const context = {
    columns,
    task: { update: updateTask, delete: deleteTask, move },
    column: { update: updateColumn, addTask },
  };
  if (!columns || columns.length < 1)
    return "Please reset storage using link in the footer. We'll add the functionality to create column soon";
  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider };
