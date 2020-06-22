const { combineReducers } = require("redux");
const { gridReducer } = require("./grid");
const { appReducer } = require("./application");

// COMBINE REDUCERS
const rootReducer = combineReducers({ app:appReducer, grid:gridReducer})

export default rootReducer