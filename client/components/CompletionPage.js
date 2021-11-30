import React from "react";
import { Link } from "react-router-dom";

//also update in users api routes
const maxTier = 6;

const CompletionPage = props => {
  const currentTier = props.location.state.tier;

  const nextTier =
    currentTier < maxTier ? (
      <Link to={`/learning/${currentTier + 1}`}>
        Click here to go to the next level
      </Link>
    ) : null;

  return (
    <div>
      <div>Congrats!! You completed level {currentTier}</div>
      <Link to="/home">Click Here to go back to all lessons</Link>
      <div>{nextTier}</div>
    </div>
  );
};

export default CompletionPage;
