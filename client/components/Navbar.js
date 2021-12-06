import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1><img class="" src="logo.png" /></h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/allLearning">All Lessons</Link>
            <Link to="/user">User Profile</Link>
            <Link to="/allTests">Tests</Link>
            <Link to='/leaderboard'>Leaderboard</Link>
            <Link to="/quickstart">Quick Start Guide</Link>
            <Link to='/commonphrases'>Common Phrases</Link>
            <Link to='/studyguide'>Study Guide</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
