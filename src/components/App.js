import React, { Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './App.css';

import Nav from './Nav';
import Dash from './Dash';

import LoginForm from './LoginForm';
import NotFound from './NotFound';

const App = (props) => {

  // console.log('%c APP Props: ', 'color: cyan', props)

  return (
    <Fragment>

      <Nav />
      <div id="nav-offset" />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dash" />} />

        <Route exact path="/dash" component={Dash} />
        <Route exact path="/login" component={LoginForm} />
        <Route component={NotFound} />
      </Switch>


    </Fragment>
  )
};

export default withRouter(App); //withRouter is a HOC that returns a COPY of App w/ React Router
