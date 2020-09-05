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
import Select from "react-select";
import style from "./_task.module.scss";
import { If } from "utils";
const options = [
  { value: "to-do", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

function App({ content, id, board, editing, index }) {
  const { task } = useContext(AppContext);
  const [value, setValue] = useState(content);
  const update = () => {
    const val = task.update(id, {
      content: value,
    });
  };

  const boardValue = options.find(({ value }) => value === board);
  console.log("ID", id);
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
              <Select
                className="mt-2"
                value={boardValue}
                options={options}
                onChange={({ value }) => {
                  task.update(id, { board: value });
                }}
              />
            </CardBody>
          </If>

          <CardFooter>
            <If test={!editing}>
              <Button
                onClick={({ value }) => {
                  task.update(id, { editing: true });
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
              <Button
                color="secondary"
                onClick={({ value }) => {
                  task.update(id, { editing: false });
                }}
              >
                Cancel
              </Button>
            </If>

            <Button
              color="danger"
              onClick={() => {
                task.delete(id);
              }}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
}

export default App;
