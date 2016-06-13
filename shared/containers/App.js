import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import UserBar from '../components/UserBar'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <UserBar user={this.props.user} dispatch={this.props.dispatch} />
          <br />
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/posts">Blog</Link>
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user })
)(App)
