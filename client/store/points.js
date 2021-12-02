import axios from 'axios';
import { authenticateRequest } from './gateKeepingMiddleware'


//action types
const GET_POINTS = 'GET_POINTS';

//action creators
const getPointsAC = (points) => {
  return {
    type: GET_POINTS,
    points
  }
}
//action creators
// const addPoints = (phrases) => {
//   return {
//     type: ADD_POINTS,
//     phrases
//   }
// }

//thunk creators
export const getPoints = () => async (dispatch) => {
  try {
    // const {data: totalPoints} = await axios.get(`/api/learning/points`)
    const userPoints = await authenticateRequest('get', `/api/users/points`)
    dispatch(getPointsAC(userPoints));
  } catch (error) {
    console.log(error)
  }
}
//thunk creators
export const addPoints = (incrementalQty) => async () => {
  try {
    await authenticateRequest('put', `/api/users/points`, {incrementalQty})
  } catch (error) {
    console.log(error)
  }
}
