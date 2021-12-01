import React from 'react';
import { Link } from 'react-router-dom';

const QuickStartGuide = () => {
  return (
    <div>
      <h1>Quick Start Guide</h1>
      <img src="QSG RedPandaASL.jpg" />
      <Link to="allLearning">
        <button>Start Learning</button>
      </Link>
    </div>
  );
};

export default QuickStartGuide;
