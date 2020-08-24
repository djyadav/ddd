import React from "react";
import { Row, Col, Card, Button, CardTitle, CardBody } from "reactstrap";
import { Task } from "components/";
import style from "./_board.module.scss";

function App({ title, tasks }) {
  return (
    <Card className={style.board}>
      <CardTitle className={style.title}>
        {title}
        <i className={`fas fa-plus ${style.add}`} color="primary" />
      </CardTitle>
      <CardBody>
        {tasks && tasks.map((task) => <Task {...task} key={task.id} />)}
      </CardBody>
    </Card>
  );
}

export default App;
