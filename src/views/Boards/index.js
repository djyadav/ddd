import React, { useContext } from "react";
import { Row, Col, Card, Button } from "reactstrap";
import { Board } from "components";
import { AppContext } from "AppContext";
function App() {
  const { tasks } = useContext(AppContext);
  const filteredTasks = tasks.reduce(
    (acc, task) => {
      acc[task.board].push(task);
      return acc;
    },
    { "to-do": [], "in-progress": [], done: [] }
  );

  console.log("task");
  return (
    <div className="App">
      <Row>
        <Col lg="4">
          <Board title="Todo" tasks={filteredTasks["to-do"]} />
        </Col>
        <Col lg="4">
          <Board title="In Progress" tasks={filteredTasks["in-progress"]} />
        </Col>
        <Col lg="4">
          <Board title="Done" tasks={filteredTasks["done"]} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
