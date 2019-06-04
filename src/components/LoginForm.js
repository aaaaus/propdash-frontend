import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { loginUser } from "../actions/user";
import "./style/LoginForm.css";
// import { Button, Form, Segment, Message } from 'semantic-ui-react'

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state.username, this.state.password); //comes from mapDispatchToProps
    this.setState({ username: "", password: "" }); //reset form to initial state
  };

  renderLoginForm() {
    return (
      <div className="wrapper">
        <form
          className="login-form"
          onSubmit={this.handleLoginSubmit}
          // loading={this.props.authenticatingUser}
          // error={this.props.failedLogin}
        >
          <h1>Property management made intuitive and easy.</h1>
          <h4>Sign in to continue to PropDash.</h4>
          <input
            className="login-input"
            label="username"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            className="login-input"
            type="password"
            label="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <div className="photo-credit-container">
          <span className="photo-credit-span">
            Photo by{" "}
            <a href="https://unsplash.com/@sickhews?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Wes Hicks
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </span>
        </div>
      </div>
    );
  }

  render() {
    // console.log("%c LOGIN FORM PROPS: ", "color: red", this.props);
    return this.props.loggedIn ? (
      <Redirect to="/dash" />
    ) : (
      <div>{this.renderLoginForm()}</div>
    );
  } //end render
} //end class

const mapStateToProps = state => {
  return {
    authenticatingUser: state.users.authenticatingUser,
    failedLogin: state.users.failedLogin,
    error: state.users.error,
    loggedIn: state.users.loggedIn
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(LoginForm)
);
