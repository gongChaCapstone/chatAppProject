import React from "react";
import { Link } from "react-router-dom";

//also update in users api routes
export const maxTier = 6;

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
      <img class="w-8/12 h-8/12"src="/congratulations.png"></img>
      <div>You completed level {currentTier}</div>
      <Link to="/allLearning">Click Here to go back to all lessons</Link>

      <div>
        <Link to="/allTests">
          Click here to see if you have unlocked any tests!
        </Link>
      </div>

      <div>{nextTier}</div>
    </div>
  );
};

export default CompletionPage;
