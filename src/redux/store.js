import logger from "redux-logger";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { toDoReducer, bucketReducer } from "./reducers";

const reducers = combineReducers({
  todos: toDoReducer,
  buckets: bucketReducer
});

const middlewares = [logger];
let store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
