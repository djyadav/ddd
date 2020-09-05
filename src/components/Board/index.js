import React, { useContext } from "react";
import { BoardProvider } from "components/Board/BoardContext";
import Board from "./Board";
const BoardIndex = ({ DATA_REF, heading, count }) => {
  return (
    <div className="mt-5">
      <h3>{heading}</h3>
      <hr />
      <BoardProvider DATA_REF={DATA_REF}>
        <Board count={count} />
      </BoardProvider>
      <hr />
    </div>
  );
};

export default BoardIndex;
