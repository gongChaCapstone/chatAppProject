import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../store';
import { useHistory } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="firstname">
            <small>First Name</small>
          </label>
          <input name="firstname" type="text" />
        </div>
        <div>
          <label htmlFor="lastname">
            <small>Last Name</small>
          </label>
          <input name="lastname" type="text" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};
