import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Blog from './containers/Blog'
import NoMatch from './components/NoMatch'
import Home from './components/Home'
import Posts from './components/Posts'
import Post from './components/Post'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="posts" component={Blog}>
      <IndexRoute component={Posts}/>
      <Route path=":id" component={Post} />
    </Route>
    <Route path="*" component={NoMatch}/>
  </Route>
)

export default routes
