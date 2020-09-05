import React from "react";
import { Row, Col, Card, Container } from "reactstrap";
import Board from "views/Board";
import { AppProvider } from "AppContext";
function App() {
  return (
    <AppProvider>
      <Container className="mt-5">
        <Board />
      </Container>
    </AppProvider>
  );
}

export default App;
