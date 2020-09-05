import React, { useState, useContext } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardBody,
  Input,
  CardFooter,
  CardHeader,
  Label,
} from "reactstrap";
import { AppContext } from "AppContext";
import { Droppable, Draggable } from "react-beautiful-dnd";
import style from "./_task.module.scss";
import { If } from "utils";

const Task = ({ content, id, column, index, editing }) => {
  const { task } = useContext(AppContext);
  const [value, setValue] = useState(content);
  const update = () => {
    const val = task.update(id, {
      column,
      content: value,
      editing: false,
    });
  };
  const setEditing = (editing) => {
    task.update(id, {
      column,
      editing,
    });
  };
  const cancel = () => {
    setEditing(false);
    setValue(content);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card
          key={id}
          className={style.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          <CardHeader className={style.title}>
            {editing && "Editing - "} <strong>{content}</strong>
          </CardHeader>
          <If test={editing}>
            <CardBody>
              <Input
                placeholder="Content"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </CardBody>
          </If>

          <CardFooter>
            <If test={!editing}>
              <Button
                onClick={() => {
                  setEditing(true);
                }}
                color="primary"
              >
                <i className="fas fa-edit"></i>
              </Button>
            </If>
            <If test={editing}>
              <Button onClick={update} color="success">
                Update
              </Button>
              <Button color="secondary" onClick={cancel}>
                Cancel
              </Button>
            </If>

            <Button
              color="danger"
              onClick={() => {
                task.delete(id, { column });
              }}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;
