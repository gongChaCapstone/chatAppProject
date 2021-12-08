import React from 'react';
import { Link } from 'react-router-dom';

const QuickStartGuide = () => {
  return (
    <div>
      <h1>Quick Start Guide</h1>
      <img src="QSG RedPandaASL.jpg" />
      <div>
        <h4>Tips and Tricks for the best user experience:</h4>
        <ul>
          <li>Be sure to allow camera access</li>
          <li>
            Keep your hand in the middle of the screen and <span class="font-bold text-red-300">parallel</span> to the camera while making the gestures
          </li>
          <li>
            Make sure your hand isn't too far away from the camera
          </li>
          <li>
            If it does not capture right away, do not worry! Adjust your hand to
            mimic the gesture as closely as possible
          </li>
        </ul>
        <h4>When ready, click the button below to start learning!</h4>
        <Link to="allLearning">
          <button>Begin Learning</button>
        </Link>
      </div>
    </div>
  );
};

export default QuickStartGuide;
