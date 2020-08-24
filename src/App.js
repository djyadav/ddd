import React from "react";
import { Row, Col, Card, Container } from "reactstrap";
import Boards from "views/Boards";
import { AppProvider } from "AppContext";
function App() {
  return (
    <AppProvider>
      <Container className="mt-5">
        <Boards />
      </Container>
    </AppProvider>
  );
}

export default App;
