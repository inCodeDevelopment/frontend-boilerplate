/* eslint-disable no-console, no-use-before-define */

// import path from 'path'
import Express from 'express'
import serialize from 'serialize-javascript'
// import qs from 'qs'

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

const app = new Express()
const port = 3000

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

          console.log('STORE STATE', store.getState(), renderProps.params)
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
