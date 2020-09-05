import React from "react";
import { Container } from "reactstrap";
import Boards from "views/Boards";
import { Footer } from "components";
function App() {
  return (
    <Container className="mt-5">
      <Boards />
      <Footer />
    </Container>
  );
}

export default App;
