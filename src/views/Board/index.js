import React, { useContext } from "react";
import { Row, Col, Card, Button } from "reactstrap";
import { Column } from "components";
import { AppContext } from "AppContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const Board = () => {
  const { tasks, updateTasks, task } = useContext(AppContext);
  const onDragEnd = (e) => {
    const { source, destination } = e;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    let updatedTasks = { ...tasks };
    if (source.droppableId === destination.droppableId) {
      const oldIndex = source.index;
      const newIndex = destination.index;
      const arr = tasks[source.droppableId].slice();
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
      updatedTasks[source.droppableId] = arr;
    } else {
      const oldIndex = source.index;
      const newIndex = destination.index;
      const sourceArr = tasks[source.droppableId].slice();
      const destinationArr = tasks[destination.droppableId].slice();
      destinationArr.splice(newIndex, 0, sourceArr.splice(oldIndex, 1)[0]);
      updatedTasks[source.droppableId] = sourceArr;
      updatedTasks[destination.droppableId] = destinationArr;
    }
    updateTasks(updatedTasks);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Row>
          {columns.map(({ title, key }, index) => (
            <Col lg="4">
              <Column
                addTask={task.add}
                key={key}
                index={index}
                title={title}
                tasks={tasks[key]}
                id={key}
              />
            </Col>
          ))}
        </Row>
      </div>
    </DragDropContext>
  );
};

const columns = [
  {
    title: "in-progress",
    key: "in-progress",
  },
  {
    title: "To Do",
    key: "to-do",
  },

  {
    title: "done",
    key: "done",
  },
];

export default Board;
