import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMaxTiers } from "../store/maxTiers"
import { maxTier } from "./CompletionPage";


const AllLearning = () => {
  const dispatch = useDispatch()
  const maxLearningTier = useSelector(state => state.maxTiers.highestLearningTier)

  useEffect(() => {
    dispatch(fetchMaxTiers())
  }, [])


  const allTiers = [];
  for (let i = 1; i <= maxTier; i++) {
    if (i <= maxLearningTier) {
      allTiers.push(<div key={i}><Link to={`/learning/${i}`}>Lesson {i}</Link></div>)
    } else {
      allTiers.push(<div key={i}>Lesson {i}</div>)
    }
  }

  return (
    <div>
      {allTiers.map(tier => tier)}
    </div>
  );
};

export default AllLearning;

