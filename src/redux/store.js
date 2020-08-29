import { createStore, applyMiddleware, combineReducers } from "redux";

const reducers = combineReducers({});

let store = createStore(reducers, applyMiddleware(...[]));

export default store;
