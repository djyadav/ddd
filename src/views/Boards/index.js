import React from "react";
import { Board } from "components";
const Boards = () => {
  return (
    <>
      <Board count={3} DATA_REF="three_column" heading="Three Column" />
      <Board count={2} DATA_REF="two_column" heading="Two Column" />
      <Board count={4} DATA_REF="four_column" heading="Four Column " />
    </>
  );
};
export default Boards;
