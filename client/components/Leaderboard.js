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
      {/* <h1 className="absolute text-3xl left-1/2 transform -translate-x-1/2 text-red-500">Red Panda Top Scorers</h1> */}
      <img className="absolute text-3xl left-1/2 transform -translate-x-1/2 w-96" src="/leaderboard.png" />
      <hr/>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-2xl">
      <table className="w-72">
        <tbody>
          <tr className="font-bold">
            <td>Rank</td>
            <td>Name</td>
            <td>Points</td>
          </tr>
        </tbody>
        {currentLeaders.map((leader, index) => {
          return (
            index === 0 ?
            <tbody key={index}>
              <tr className="border-4 bg-green-200 border-gray-500 font-semibold">
                <td><img className="w-8" src="/first.png" /></td>
                <td>{leader.firstname}</td>
                <td className="text-yellow-300">{leader.points}</td>
              </tr>
            </tbody> :
            index === 1 ?
            <tbody key={index}>
            <tr className="border-4 bg-green-400 border-gray-500 font-semibold">
              <td><img className="w-8" src="/second.png" /></td>
              <td>{leader.firstname}</td>
              <td className="text-yellow-300">{leader.points}</td>
            </tr>
          </tbody> :
          index === 2 ?
          <tbody key={index}>
          <tr className="border-4 bg-green-600 border-gray-500 font-semibold">
            <td><img className="w-8" src="/third.png" /></td>
            <td>{leader.firstname}</td>
            <td className="text-yellow-300">{leader.points}</td>
          </tr>
        </tbody> :
        <tbody key={index}>
        <tr className="border-4 bg-green-700 border-gray-500 font-semibold">
          <td className="pl-2">{index + 1}. </td>
          <td>{leader.firstname}</td>
          <td className="text-yellow-300">{leader.points}</td>
        </tr>
      </tbody>
          );
        })}
      </table>
      </div>
    </div>
  );
};

export default Leaderboard;
