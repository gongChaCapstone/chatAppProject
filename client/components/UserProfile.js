import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth";

const UserProfile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth);
  const [email, setEmail] = useState(currentUser.email);
  const [firstname, setFirstname] = useState(currentUser.firstname);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [password, setPassword] = useState(null);

  const legend = {
    email: setEmail,
    firstname: setFirstname,
    lastname: setLastname,
    password: setPassword,
  };


  const handleChange = evt => {
    const fn = legend[evt.target.name];

    fn(evt.target.value);

    console.log(email, firstname, lastname, password)
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(setUser({email, firstname, lastname}))
  }

  return (
    <div>
      <h1>Hello, {firstname}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" value={email} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" name="firstname" value={firstname} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" name="lastname" value={lastname} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserProfile;

/*
1) update page with current user data
2) useState to hold current values being typed
3) handleSubmit to update
    1) make thunk for updating user
*/
