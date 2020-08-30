import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { toDoReducer } from "./reducers";

const reducers = combineReducers({
  todos: toDoReducer
});

let store = createStore(reducers);

export default store;
