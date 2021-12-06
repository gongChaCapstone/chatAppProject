import React from "react";
import { Link } from "react-router-dom";

const TestCompletionPage = props => {
  const currentTestTier = props.location.state.tier;

  return (
    <div>
      <div>Congrats!! You completed test {currentTestTier}</div>
      <Link to="/allLearning">Click Here to go back to all lessons</Link>
    </div>
  );
};

export default TestCompletionPage;
