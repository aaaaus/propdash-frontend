import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
// import { Button, Form, Segment, Message } from 'semantic-ui-react'

class LoginForm extends React.Component {
  state = { username: '', password: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLoginSubmit = (e) => { //semantic forms preventDefault for you
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password) //comes from mapDispatchToProps
    this.setState({ username: '', password: '' }) //reset form to initial state
  }

  render() {
    console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props)
    return this.props.loggedIn ? (
      <Redirect to="/dash" />
    ) : (
      <div>
        <form
         onSubmit={this.handleLoginSubmit}
         // loading={this.props.authenticatingUser}
         // error={this.props.failedLogin}
         >
          <input
             label="username"
             placeholder="username"
             name="username"
             onChange={this.handleChange}
             value={this.state.username} />
          <input
             type="password"
             label="password"
             placeholder="password"
             name="password"
             onChange={this.handleChange}
             value={this.state.password} />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }//end render

} //end class

const mapStateToProps = (reduxState) => {
  return {
    authenticatingUser: reduxState.users.authenticatingUser,
    failedLogin: reduxState.users.failedLogin,
    error: reduxState.users.error,
    loggedIn: reduxState.users.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
