import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth";

const UserProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth);
  const [email, setEmail] = useState(currentUser.email);
  const [firstname, setFirstname] = useState(currentUser.firstname);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [password, setPassword] = useState("");

  const legend = {
    email: setEmail,
    firstname: setFirstname,
    lastname: setLastname,
    password: setPassword,
  };

  const handleChange = evt => {
    const fn = legend[evt.target.name];

    fn(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const lowerCaseEmail = email.toLowerCase();

    const newInfo = password
      ? { email: lowerCaseEmail, firstname, lastname, password }
      : { email: lowerCaseEmail, firstname, lastname };

    dispatch(setUser(newInfo));
  };

  return (
    <div>
      <h1>Hello, {firstname}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfile;
