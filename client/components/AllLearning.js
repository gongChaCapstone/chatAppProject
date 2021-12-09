import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMaxTiers } from '../store/maxTiers';
import { maxTier } from './CompletionPage';
import {me} from '../store/auth'

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const alphaTiers = {
  1: 'A B C D',
  2: 'E F G H',
  3: 'I J K L M',
  4: 'N O P Q',
  5: 'R S T U',
  6: 'V W X Y Z',
};

const AllLearning = () => {
  const dispatch = useDispatch();
  const maxLearningTier = useSelector(
    (state) => state.maxTiers.highestLearningTier
  );
  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMaxTiers());
    dispatch(me());
  }, []);

  const allTiers = [];
  for (let i = 1; i <= maxTier; i++) {
    if (i <= maxLearningTier) {
      allTiers.push(
        [<div key={i}>
          <Link to={`/learning/${i}`}>{alphaTiers[i]}</Link>
        </div>, true]
      );
    } else {
      [allTiers.push(<div key={i}>{alphaTiers[i]}</div>), false]
    }
  }

  const letterImages = {};
  for (let i = 0; i < alphabet.length; i++) {
    letterImages[alphabet[i]] = `letter${alphabet[i]}.png`;
  }

  const aslName = [];
  for (let i = 0; i < currentUser.firstname.length; i++) {
    aslName.push(
      <img
        key={i}
        src={letterImages[currentUser.firstname[i].toUpperCase()]}
        style={{
          width: 50,
          height: 50,
        }}
      />
    );
  }

  return (
    <div>
      <div class="flex justify-around">
        <h1 class="flex">
          <span class="text-4xl font-bold text-gray-700 z-10"><div class="p-2">Howdy</div></span> {aslName.map((image) => image)}
          {/* <div class="text-4xl text-gray-700 font-bold p-2">({currentUser.firstname})</div> */}
        </h1>
        <h4 class="float-right text-gray-700 text-4xl font-bold p-2">Points: {currentUser.points}</h4>
      </div>
      <img class="absolute object-cover h-full w-full z-0 mt-12"src="background3.png"/>
      <div class="flex">
        <div class="grid z-0 grid-cols-2 flex-grow flex-wrap justify-items-center my-8 p-5 mt-16">
          {allTiers.map((tier) => {
            return tier[1] === true ? <button className="inline-block  rounded-lg shadow-lg bg-green-700 hover:bg-green-300 hover:-translate-y-0.5 transform transition text-white uppercase tracking-widest font-medium text-3xl border-solid border-2 border-white w-96 h-20 mx-48 mt-16">{tier}</button> :
            <button className="inline-block px-4 py-1 rounded-lg shadow-lg bg-gray-500 line-through text-opacity-40 transform transition text-white mt-3 uppercase tracking-widest font-medium text-3xl border-solid border-2 border-white w-96 h-20 mx-48 mt-16">{tier}</button>
          })}
        </div>
      </div>
    </div>
  );
};

export default AllLearning;
