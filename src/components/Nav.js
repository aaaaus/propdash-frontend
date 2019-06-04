import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user";

import "./style/Nav.css";

class Nav extends React.Component {
  renderGreeting() {
    if (this.props.currentUser) {
      return (
        <div>
          <span className="nav-span-3">
            Hello, {this.props.currentUser.username.toUpperCase()}
          </span>
          <button className="logoutButton" onClick={this.handleClick}>
            Sign Out
          </button>
        </div>
      );
    }
  }

  buttonTest() {
    console.log("button clicked");
  }

  handleClick = event => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    this.props.logoutUser();
  };

  render() {
    console.log("NAV props:", this.props);
    return (
      <div id="nav-div">
        <div id="nav-sub-1">{/* future nav elements */}</div>
        <div id="nav-sub-2">
          <span className="nav-span-2">PropDash</span>
        </div>
        <div id="nav-sub-3">{this.renderGreeting()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.user
  };
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(Nav);
