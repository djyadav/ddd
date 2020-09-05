import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { Column } from "components";
import { AppContext } from "AppContext";
import { DragDropContext } from "react-beautiful-dnd";
const Board = () => {
  const { task, columns } = useContext(AppContext);
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
      <Row>
        {columns.map((column, index) => (
          <Col lg="4" className="mb-4">
            <Column
              addTask={task.add}
              key={column.id}
              index={index}
              {...column}
            />
          </Col>
        ))}
      </Row>
    </DragDropContext>
  );
};

export default Board;
