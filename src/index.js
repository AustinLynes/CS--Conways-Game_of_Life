import React from 'react';
import ReactDOM from 'react-dom'
import './global-style/index.scss'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import {Provider}from 'react-redux'
import { gridReducer } from './store/reducers'
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(gridReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

