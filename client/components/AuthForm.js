import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../store';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <div>
      <img className="w-1/2 absolute left-1/2 transform -translate-x-1/2 -translate-y-16" src="/welcome.gif" />
      <img className="w-1/3 absolute left-20 top-1/2 transform" src="/logoPanda.png" />
      <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login"><div className="rounded-lg shadow-lg bg-yellow-500 hover:bg-yellow-600 transition text-white uppercase tracking-widest font-medium text-xl border-solid border-2 border-white w-28 h-8 text-center absolute left-1/2 transform -translate-x-1/2 translate-y-64">Login</div></Link>
            <Link to="/signup"><div className="rounded-lg shadow-lg bg-yellow-500 hover:bg-yellow-600 transition text-white uppercase tracking-widest font-medium text-xl border-solid border-2 border-white w-28 h-8 text-center absolute left-1/2 transform -translate-x-1/2 translate-y-80">Sign Up</div></Link>
      </div>
    </div>
  );
}

export const Login = () => {
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = (evt.target.email.value).toLowerCase();
    const password = evt.target.password.value;
    dispatch(authenticate(email, password, 'login'));
  };

  return (
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
  );
};

export const Signup = () => {
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = (evt.target.email.value).toLowerCase();
    const password = evt.target.password.value;
    const firstname = evt.target.firstname.value;
    const lastname = evt.target.lastname.value;
    dispatch(authenticate(email, password, 'signup', firstname, lastname));
    history.push('/quickstart');
  };


  return (
    <div>
      <img className="w-1/2 absolute left-1/2 transform -translate-x-1/2 -translate-y-16" src="/welcome.gif" />
      <img className="w-1/3 absolute left-2/3 top-1/2 transform" src="/logoPanda2.png" />
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-8 mt-4 font-bold text-gray-800 p-2">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="mr-3" htmlFor="email">Email</label>
            <input className="border-2 border-green-500 mb-5" name="email" type="text" />
          </div>
          <div>
            <label className="mr-3" htmlFor="password">Password</label>
            <input className="border-2 border-green-500 mb-5" name="password" type="password" />
          </div>
          <div>
            <label className="mr-3" htmlFor="firstname">First Name</label>
            <input className="border-2 border-green-500 mb-5" name="firstname" type="text" />
          </div>
          <div>
            <label className="mr-3" htmlFor="lastname">Last Name</label>
            <input className="border-2 border-green-500 mb-5" name="lastname" type="text" />
          </div>
          <div>
            <button className="ml-24 rounded-lg shadow-lg bg-yellow-500 hover:bg-yellow-600 transition text-white uppercase tracking-widest font-medium text-xl border-solid border-2 border-white w-28 h-8 text-center absolute" type="submit">Sign Up</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  );
};
