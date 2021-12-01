import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const currentUser = useSelector(state => state.auth)

  console.log(currentUser)

  return (<div>HI</div>)
}

export default UserProfile


/*
1) update page with current user data
2) useState to hold current values being typed
3) handleSubmit to update
    1) make thunk for updating user
*/
