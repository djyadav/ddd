import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import style from "./_board.module.scss";
import TaskList from "./TaskList";
import { Card, CardBody, CardTitle } from "reactstrap";
function App({ title, tasks, id }) {
  return (
    <Card className={style.board} data-id={id}>
      <CardTitle className={style.title}>
        {title}
        <i className={`fas fa-plus ${style.add}`} color="primary" />
      </CardTitle>
      <Droppable droppableId={id}>
        {(provided) => (
          <CardBody innerRef={provided.innerRef} {...provided.droppableProps}>
            <TaskList tasks={tasks} />
            {provided.placeholder}
          </CardBody>
        )}
      </Droppable>
    </Card>
  );
}

export default App;
