import React from 'react';
import { Link } from 'react-router-dom';

const QuickStartGuide = () => {
  return (
    <div>
      <img class="border-2 border-black w-7/12"src="infographic.png" />
      <div>
        <h4 class="font-bold" >Tips and Tricks for the best user experience:</h4>
        <ul>
          <li>• Be sure to allow camera access</li>
          <li>
            • Keep your hand in the middle of the screen while making the gestures
          </li>
          <li>
            • If it does not capture right away, do not worry! Adjust your hand to
            mimic the gesture as closely as possible
          </li>
        </ul>
        <h4 class="font-bold">When ready, click the button below to start learning!</h4>
        <Link to="allLearning">
          <button className="inline-block px-4 py-1 rounded-lg shadow-lg bg-green-700 hover:bg-green-300 hover:-translate-y-0.5 transform transition text-white mt-3 uppercase tracking-wider font-semibold text-sm border-solid border-2 border-black w-44 h-10">Begin Learning</button>
        </Link>
      </div>
    </div>
  );
};

export default QuickStartGuide;
