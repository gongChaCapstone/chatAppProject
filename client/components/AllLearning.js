import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMaxTiers } from "../store/maxTiers"

const AllLearning = () => {
  const dispatch = useDispatch()
  const maxLearningTier = useSelector(state => state.maxTiers.highestLearningTier)

  useEffect(() => {
    dispatch(fetchMaxTiers())
  }, [])


  const tierOne = 1 <= maxLearningTier ? <Link to='/learning/1'>Lesson One</Link> : <div>Lesson One</div>
  const tierTwo = 2 <= maxLearningTier ? <Link to='/learning/2'>Lesson Two</Link> : <div>Lesson Two</div>
  const tierThree = 3 <= maxLearningTier ? <Link to='/learning/3'>Lessone Three</Link> : <div>Lesson Three</div>
  const tierFour = 4 <= maxLearningTier ? <Link to='/learning/4'>Lessone Four</Link> : <div>Lesson Four</div>
  const tierFive = 5 <= maxLearningTier ? <Link to='/learning/5'>Lessone Five</Link> : <div>Lesson Five</div>
  const tierSix = 6 <= maxLearningTier ? <Link to='/learning/6'>Lessone Six</Link> : <div>Lesson Six</div>

  return (
    <div>
      <div>{tierOne}</div>
      <div>{tierTwo}</div>
      <div>{tierThree}</div>
      <div>{tierFour}</div>
      <div>{tierFive}</div>
      <div>{tierSix}</div>
    </div>
  );
};

export default AllLearning;

