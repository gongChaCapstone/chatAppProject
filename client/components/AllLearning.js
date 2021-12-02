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

const AllLearning = () => {
  const dispatch = useDispatch();
  const maxLearningTier = useSelector(
    (state) => state.maxTiers.highestLearningTier
  );
  const currentUser = useSelector((state) => state.auth);
  // const UserName = currentUser.firstname || '';


  useEffect(() => {
    dispatch(fetchMaxTiers());
  }, []);

  const allTiers = [];
  for (let i = 1; i <= maxTier; i++) {
    if (i <= maxLearningTier) {
      allTiers.push(
        <div key={i}>
          <Link to={`/learning/${i}`}>Lesson {i}</Link>
        </div>
      );
    } else {
      allTiers.push(<div key={i}>Lesson {i}</div>);
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
        <h1>
          Hello, {currentUser.firstname} ({aslName.map((image) => image)})
        </h1>
        <h4>Points: {currentUser.points}</h4>
      </div>
      {allTiers.map((tier) => tier)}
    </div>
  );
};

export default AllLearning;
