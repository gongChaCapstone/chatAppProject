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
      <h1 class="mt-6 ml-2 font-bold text-lg text-left text-red-800" >Hello, {firstname} If you want to update any information about your profile, please do below. Happy learning!</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className=" mt-4 font-bold text-gray-800 p-2">
          <label htmlFor="email" className="mr-3">Email:</label>
          <input
            className="border-2 border-red-700"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className=" mt-4 font-bold text-gray-800 p-2">
          <label htmlFor="password" className="mr-3">Password:</label>
          <input
            className="border-2 border-red-700"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className=" mt-4 font-bold text-gray-800 p-">
          <label htmlFor="firstname" className="mr-3 ml-2">First Name:</label>
          <input
            className="border-2 border-red-700"
            type="text"
            name="firstname"
            value={firstname}
            onChange={handleChange}
          />
        </div>

        <div className=" mt-4 font-bold text-gray-800 p-2">
          <label htmlFor="lastname" className="mr-3">Last Name:</label>
          <input
            className="border-2 border-red-700"
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
          />
        </div>

        <button class="ml-2 inline-block px-4 py-1 rounded-lg shadow-lg bg-red-800 hover:bg-red-400 hover:-translate-y-0.5 transform transition text-white mt-3 uppercase tracking-wider font-semibold text-sm" type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfile;
