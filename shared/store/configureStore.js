import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise'

import posts from '../reducers/posts'

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

export function configureStore(history, initialState = { posts: [] }) {
  const reducer = (...args) => {
    return combineReducers({
      posts,
      routing: routerReducer
    })(...args)
  }

  let devTools = []
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ]
  }

  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState, compose(
    applyMiddleware(
      routerMiddleware(history)
    ),
    ...devTools
  ))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
