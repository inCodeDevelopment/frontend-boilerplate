import React, { Component } from 'react'
import { Route, IndexRoute, Link } from 'react-router'

import { loadPosts } from './actions'

class App extends Component {
  static needs = [
    loadPosts
  ]

  render() {
    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/foo">Foo</Link>
          {' '}
          <Link to="/bar">Bar</Link>
        </header>
        {this.props.children}
      </div>
    )
  }
}

const Home = () => (<div>Home!</div>)
const Foo = () => (<div>Foo!</div>)
const Bar = () => (<div>Bar!</div>)

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="foo" component={Foo}/>
    <Route path="bar" component={Bar}/>
  </Route>
)

export default routes
