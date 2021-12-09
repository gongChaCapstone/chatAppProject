import React from "react";
import { Link } from "react-router-dom";

const TestCompletionPage = props => {
  const currentTestTier = props.location.state.tier;

  return (
    <div>
    <div class="flex justify-center">
      <img class="w-8/12 h-8/12 justify-center"src="/congratulations_test.gif"></img>
      </div>
      <div class="flex">
      <h1 class="text-4xl font-bold text-red-500 font-mono m-auto">You have completed <span class="text-purple-400"> test {currentTestTier}</span>!</h1>
      </div>

      <div class ="flex grid grid-cols-1 p-12 justify-items-center">
        <button class="inline-block  rounded-lg shadow-lg bg-purple-500 hover:bg-purple-300 hover:-translate-y-0.5 transform transition text-white  tracking-widest font-medium text-xl border-solid border-2 border-white w-48 h-16 mx-48 mt-16">
      <Link to="/allLearning">All lessons</Link> </button>

    </div>
    </div>
  );
};

export default TestCompletionPage;
