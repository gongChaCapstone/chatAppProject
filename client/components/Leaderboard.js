import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeaders } from "../store/leaderboard";

const Leaderboard = props => {
  const dispatch = useDispatch();
  const currentLeaders = useSelector(state => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaders());
  }, []);

  return (
    <div className="flex">
      <h1>Red Panda Top Scorers</h1>
      <table className="">
        <tbody>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Points</td>
          </tr>
        </tbody>
        {currentLeaders.map((leader, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{index + 1}. </td>
                <td>{leader.firstname}</td>
                <td>{leader.points}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Leaderboard;
