import React, { Component, PropTypes } from 'react'
import { auth, logout } from '../actions/user'

class UserBar extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  handleLogin(e) {
    e.preventDefault()
    let { dispatch } = this.props
    dispatch(auth(this.refs.email.value, this.refs.password.value))
  }

  handleLogout(e) {
    e.preventDefault()
    let { dispatch } = this.props
    dispatch(logout())
  }

  render() {
    const user = this.props.user
    if (user) {
      return (
        <span>
          Hello {user.email}!
          {' '}
          <a onClick={this.handleLogout.bind(this)} href="">Logout</a>
        </span>
      )
    } else {
      return (
        <span>
          Login:
          <input type="text" ref="email" defaultValue="user@example.net" />
          <input type="password" ref="password" defaultValue="123" />
          <input type="submit" value="Login" onClick={this.handleLogin.bind(this)} />
        </span>
      )
    }
  }
}

export default UserBar
