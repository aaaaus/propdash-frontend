import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user";

class Nav extends React.Component {
  renderGreeting() {
    return this.props.currentUser
      ? `Hello, ${this.props.currentUser.username}`
      : null;
  }

  buttonTest() {
    console.log("button clicked");
  }

  render() {
    console.log("NAV props:", this.props);
    return (
      <div id="nav-div">
        <div id="nav-sub-1">
          <span className="nav-span-1">Dashboard</span>
        </div>
        <div id="nav-sub-2">
          <span className="nav-span-2">PropDash</span>
        </div>
        <div id="nav-sub-3">
          <span className="nav-span-3">{this.renderGreeting()}</span> |
          <button onClick={this.props.logoutUser}>Logout</button>
        </div>
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
