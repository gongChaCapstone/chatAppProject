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

  /*
  <div>
      <img className="w-1/2 absolute left-1/2 transform -translate-x-1/2 -translate-y-16" src="/welcome.gif" />
      <img className="w-1/3 absolute left-20 top-1/2 transform" src="/logoPanda.png" />
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 mt-4 font-bold text-gray-800 p-2">
        <form onSubmit={handleSubmit}>
          <div className="ml-4">
            <label htmlFor="email" className="mr-3">Email:</label>
            <input className="border-2 border-green-500 mb-5" name="email" type="text" />
          </div>
          <div className="mr-2">
            <label htmlFor="password" className="mr-3">Password:</label>
            <input className="border-2 border-green-500 mb-8" name="password" type="password" />
          </div>
          <div>
            <button className="ml-24 rounded-lg shadow-lg bg-yellow-500 hover:bg-yellow-600 transition text-white uppercase tracking-widest font-medium text-xl border-solid border-2 border-white w-28 h-8 text-center absolute" type="submit">Login</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  */

  return (
    <div>
      <h1 class="mt-6 ml-2 font-bold text-xl text-left text-red-600 flex justify-center font-mono" >Hello, {firstname} If you want to update any information about your profile, please do below. Happy learning!</h1>
      <img className="w-1/3 absolute left-3/4 top-1/2 transform translate-x-20" src="/logoPanda3.png" />
      <div className=" mt-16 grid grid-cols-1 justify-items-center font-bold text-gray-800 m-auto ">
        <form className="" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mr-12 ml-2">Email:</label>
            <input
              className="border-2 border-purple-500 "
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />

          <div className=" mt-4 font-bold text-gray-800 p-2">
            <label htmlFor="password" className="mr-4">Password:</label>
            <input
              className="border-2 border-purple-500"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className=" mt-4 font-bold text-gray-800 p-">
            <label htmlFor="firstname" className="mr-2 ml-2">First Name:</label>
            <input
              className="border-2 border-purple-500"
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleChange}
            />
          </div>

          <div className=" mt-4 font-bold text-gray-800 p-2">
            <label htmlFor="lastname" className="mr-3">Last Name:</label>
            <input
              className="border-2 border-purple-500"
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleChange}
            />
          </div>
          <div class="flex grid grid-cols-1 justify-items-center">
          <button className=" inline-block px-4 py-1 rounded-lg shadow-lg bg-purple-500 hover:bg-purple-300 hover:-translate-y-0.5 transform transition text-white mt-3 uppercase tracking-wider font-semibold text-md border-solid border-2 border-black w-44 h-10" type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
