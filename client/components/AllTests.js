import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMaxTiers } from "../store/maxTiers";

const AllTests = () => {
  const dispatch = useDispatch();
  const maxTestTier = useSelector((state) => state.maxTiers.highestTestTier);

  useEffect(() => {
    dispatch(fetchMaxTiers());
  }, []);

  const allTiers = [];
  for (let i = 1; i <= maxTestTier; i++) {
    let testNumber = i;
    if (i <= maxTestTier) {
      allTiers.push(
        <div key={i}>
          <Link to={`/test/${i}`}>Test {testNumber}</Link>
        </div>
      );
    } else {
      allTiers.push(<div key={i}>Test {testNumber}</div>);
    }
  }

  return <div>{allTiers.map((tier) => tier)}</div>;
};

export default AllTests;
