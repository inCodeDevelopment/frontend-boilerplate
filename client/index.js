import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Cookies from 'js-cookie'

import { configureStore, DevTools } from '../shared/store/configureStore'
import routes from '../shared/routes'

const store = configureStore(browserHistory, window.__initialState__)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

render(
  <Provider store={store}>
    <DevTools/>
  </Provider>,
  document.getElementById('devtools')
)

store.subscribe(() => {
  let state = store.getState()
  if (state.user) {
    if (localStorage.getItem('token') != state.user.token) {
      localStorage.setItem('token', state.user.token)
      Cookies.set('token', state.user.token)
    }
  } else {
    localStorage.removeItem('token')
    Cookies.remove('token')
  }
})
