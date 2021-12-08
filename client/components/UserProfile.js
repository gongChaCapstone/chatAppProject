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
      <h1 class="mt-6 font-bold text-lg text-left text-red-800" >Hello, {firstname} If you want to update any information about your profile, please do below. Happy learning!</h1>
      <form onSubmit={handleSubmit}>
        <div className=" mt-4 font-bold text-gray-400">
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

        <button class="inline-block px-4 py-1 rounded-lg shadow-lg bg-red-800 hover:bg-red-400 hover:-translate-y-0.5 transform transition text-white mt-3 uppercase tracking-wider font-semibold text-sm" type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfile;
