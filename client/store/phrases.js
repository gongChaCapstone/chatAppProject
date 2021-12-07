import axios from 'axios';
import { authenticateRequest } from './gateKeepingMiddleware'


//action types
const SET_PHRASES = 'SET_PHRASES';

//action creators
const setPhrases = (phrases) => {
  return {
    type: SET_PHRASES,
    phrases
  }
}

//thunk creators
export const fetchPhrases = (tierId) => async (dispatch) => {
  try {
    const {data: currentPhrases} = await axios.get(`/api/phrases/${tierId}`)

    dispatch(setPhrases(currentPhrases))
  } catch (error) {
    console.log(error)
  }
}

// export const fetchTestPhrases = (tierId) => async (dispatch) => {
//   try {
//     const secondTier = tierId * 2
//     const {data: currentPhrases1} = await axios.get(`/api/phrases/${secondTier - 1}`)
//     const {data: currentPhrases2} = await axios.get(`/api/phrases/${secondTier}`)
//     const currentPhrases = currentPhrases1.concat(currentPhrases2)

//     dispatch(setPhrases(currentPhrases))
//   } catch (error) {
//     console.log(error)
//   }
// }

export const unlockPhrases = (tierId) => async () => {
  try {
    await authenticateRequest('put', `/api/users/update/${tierId}`, {})
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case SET_PHRASES:
      return action.phrases
    default:
      return state
  }
}
