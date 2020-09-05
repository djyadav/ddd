import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import style from "./_column.module.scss";
import TaskList from "./TaskList";
import { Card, CardBody, CardTitle } from "reactstrap";
const Column = ({ title, tasks, id, addTask }) => {
  return (
    <Card className={style.column} data-id={id}>
      <CardTitle className={style.title}>
        {title}
        <i
          className={`fas fa-plus ${style.add}`}
          color="primary"
          onClick={() => {
            addTask({ column: id });
          }}
        />
      </CardTitle>
      <Droppable droppableId={id}>
        {(provided) => (
          <CardBody innerRef={provided.innerRef} {...provided.droppableProps}>
            <TaskList tasks={tasks} column={id} />
            {provided.placeholder}
          </CardBody>
        )}
      </Droppable>
    </Card>
  );
};

export default Column;
