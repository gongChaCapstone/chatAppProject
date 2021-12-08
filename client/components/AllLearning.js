import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMaxTiers } from '../store/maxTiers';
import { maxTier } from './CompletionPage';

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
  }, []);

  const allTiers = [];
  for (let i = 1; i <= maxTier; i++) {
    if (i <= maxLearningTier) {
      allTiers.push(
        <div key={i}>
          <Link to={`/learning/${i}`}>{alphaTiers[i]}</Link>
        </div>
      );
    } else {
      allTiers.push(<div key={i}>{alphaTiers[i]}</div>);
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
      <div>
        <h1 class="flex">
          <span class="text-2xl z-10">Howdy</span> {aslName.map((image) => image)} ({currentUser.firstname})
        </h1>
        <h4 class="float-right m-7 -mt-8">Points: {currentUser.points}</h4>
      </div>
      <div class="flex">
      <div class="grid z-0 grid-cols-3 justify-center flex-grow flex-wrap justify-items-center my-8 p-5">
      {allTiers.map((tier) => {
        return <button className="inline-block px-4 py-1 rounded-lg shadow-lg bg-green-700 hover:bg-green-300 hover:-translate-y-0.5 transform transition text-white mt-3 uppercase tracking-wider font-semibold text-sm border-solid border-2 border-black w-32 h-12">{tier}</button>})
        }

      </div>
      </div>
      <img class="z-0 -mt-52"src="background3.png"/>
    </div>
  );
};

export default AllLearning;
