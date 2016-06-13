/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import serialize from 'serialize-javascript'
import cookie from 'cookie-parser'
import body from 'body-parser'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken' // using in demo auth route only

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Helmet from 'react-helmet'

import routes from '../shared/routes'
import { configureStore } from '../shared/store/configureStore'
import fetchComponentData from '../shared/lib/fetchComponentData'
import { login } from '../shared/actions/user'

import config from './config'

const app = new Express()
const port = config.server.port

app.use(cookie())
app.use(jwt({
  secret: config.auth.JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    let token = null
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token
    } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      token = req.query.token
    }
    req.token = token
    return token
  }
}))

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// Demo auth route
app.post('/login', body.json(), (req, res) => {
  let id = Math.round(Math.random() * 10000)
  let user = {
    id,
    email: req.body.email
  }
  let token = jsonwebtoken.sign(user, config.auth.JWT_SECRET)
  res.json({ ...user, token })
})

const HTML = ({ content, store, head }) => {
  return (
    <html>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
        <div id="devtools"/>
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
        <script src="/static/bundle.js"/>
      </body>
    </html>
  )
}

app.use(function (req, res) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  if (req.user) {
    store.dispatch(login({ ...req.user, token: req.token }))
  }

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        if (error) {
          res.status(500).send(error.message)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          const content = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          )
          let head = Helmet.rewind()

          res.send('<!doctype html>\n' +
            renderToString(<HTML content={content} store={store} head={head}/>))
        }
      })
      .catch((error) => {
        res.status(500).send(error.message)
      })
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on port ${port}`)
  }
})
