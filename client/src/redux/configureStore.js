import {createLogger} from "redux-logger/src";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {reducers} from "./feautures";

const logger = createLogger({
    diff: true,
    collapsed: true
})

export default createStore(
    combineReducers(reducers),
    composeWithDevTools(applyMiddleware(logger, thunk))
);