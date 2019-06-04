import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
// import * as actions from '../actions'
import { fetchCurrentUser } from "../actions/user";
// import { Loader } from 'semantic-ui-react'

//withAuth is a higher order component used to 'lock down' components that should only be viewed while logged in

const withAuth = WrappedComponent => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      // console.log('%c INSIDE COMPONENT DID MOUNT FOR AUTH HOC', 'color: purple')
      // POTENTIAL SECURITY FLAW!!! my tokens don't expire
      if (localStorage.getItem("jwt") && !this.props.loggedIn)
        this.props.fetchCurrentUser(); // if I have a token but don't know who it belongs to, ask the server for that user's data
    }

    render() {
      // console.log('%c INSIDE RENDER FOR HOC', 'color: green')
      if (localStorage.getItem("jwt") && this.props.loggedIn) {
        //i have a token and i'm logged in
        // wrapped component is Dash
        return <WrappedComponent />;
      } else if (
        localStorage.getItem("jwt") &&
        (this.props.authenticatingUser || !this.props.loggedIn)
      ) {
        //we're currently fetching, show a loading spinner
        return <p>"LOADING"</p>; //<Loader active inline="centered" />
      } else {
        //user is not AUTHORIZED to see this component
        console.log("MADE IT TO LOGIN REDIRECT");
        return <Redirect to="/login" />;
      }
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.users.loggedIn,
      authenticatingUser: state.users.authenticatingUser
    };
  };

  return connect(
    mapStateToProps,
    { fetchCurrentUser }
  )(AuthorizedComponent);
};

export default withAuth;
