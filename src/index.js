import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import './index.css'
import {App} from './containers'

import rootSaga from './sagas'
import * as reducers from './reducers'


// const PROCESS = process.env.NODE_ENV

// if (PROCESS !== 'production') {
//   // eslint-disable-next-line no-unused-vars,react/no-deprecated
//   let createClass = React.createClass
//   Object.defineProperty(React, 'createClass', {
//     set: (nextCreateClass) => {
//       createClass = nextCreateClass
//     }
//   })
//   console.log('wrapping with whyDidYouUpdate in ', PROCESS)
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ ...reducers }),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

rootSaga.forEach(saga => sagaMiddleware.run(saga))

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
