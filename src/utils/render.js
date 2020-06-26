// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { initialState as reducerInitialState } from './reducer'
import rootReducer from '../store/reducers'
import {init as reducerInitialGridState} from "../store/reducers/grid" 
import {init as reducerInitialAppState} from "../store/reducers/application" 


const reducerInitialState = {
    grid: reducerInitialGridState, 
    app: reducerInitialAppState
}

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }