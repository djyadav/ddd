import React, { useContext } from "react";
import { Row, Col, Card, Button } from "reactstrap";
import { Column } from "components";
import { AppContext } from "AppContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const Board = () => {
  const { tasks, updateTasks, task, columns } = useContext(AppContext);
  const onDragEnd = (e) => {
    const { source, destination } = e;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    task.move(source, destination);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Row>
          {columns.map((column, index) => (
            <Col lg="4">
              <Column
                addTask={task.add}
                key={column.id}
                index={index}
                {...column}
              />
            </Col>
          ))}
        </Row>
      </div>
    </DragDropContext>
  );
};

// const columns = [
//   {
//     title: "in-progress",
//     key: "in-progress",
//   },
//   {
//     title: "To Do",
//     key: "to-do",
//   },
//
//   {
//     title: "done",
//     key: "done",
//   },
// ];

export default Board;
