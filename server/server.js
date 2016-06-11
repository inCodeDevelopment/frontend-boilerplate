/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import serialize from 'serialize-javascript'
import cookie from 'cookie-parser'
import jwt from 'express-jwt'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../shared/routes'
import { configureStore } from '../shared/store/configureStore'
import fetchComponentData from '../shared/lib/fetchComponentData'

import config from './config'

const app = new Express()
const port = config.server.port

app.use(cookie())
app.use(jwt({
  secret: config.auth.JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.cookies && req.cookies.token) {
      return req.cookies.token
    } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    }
    return null
  }
}))

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const HTML = ({ content, store }) => (
  <html>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <div id="devtools"/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="/static/bundle.js"/>
    </body>
  </html>
)

app.use(function (req, res) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

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

          res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
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
