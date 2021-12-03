import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import SingleLearning from './components/SingleLearning';
import CompletionPage from './components/CompletionPage';
import AllLearning from './components/AllLearning';
import QuickStartGuide from './components/QuickStartGuide';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/allLearning" component={AllLearning} />
          <Route exact path="/learning/:tier" component={SingleLearning} />
          <Route path="/completionPage" component={CompletionPage} />
          <Route path="/quickstart" component={QuickStartGuide} />
          <Route path="/user" component={UserProfile} />
          <Route path='/leaderboard' component={Leaderboard}/>
          <Redirect to="/allLearning" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
  );
};

export default withRouter(Routes);
