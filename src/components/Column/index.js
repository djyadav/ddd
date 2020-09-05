import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "components/Task";
import { Card, CardBody } from "reactstrap";
import Title from "./Title";
import style from "./_column.module.scss";
const Column = ({ title, tasks, id: column, addTask }) => {
  return (
    <Card className={style.column}>
      <Title title={title} addTask={addTask} column={column} />
      <Droppable droppableId={column}>
        {(provided) => (
          <CardBody innerRef={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => {
              return (
                <Task {...task} key={task.id} index={index} column={column} />
              );
            })}

            {provided.placeholder}
          </CardBody>
        )}
      </Droppable>
    </Card>
  );
};

export default Column;
