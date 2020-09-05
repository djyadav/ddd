import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { Column } from "components";
import { BoardContext } from "components/Board/BoardContext";

import { DragDropContext } from "react-beautiful-dnd";
const Board = ({ count }) => {
  const { task, columns } = useContext(BoardContext);
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
      <Row className="bg-light pt-5">
        {columns.map((column, index) => (
          <Col lg={12 / count} className="mb-4">
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
