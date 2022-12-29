import { combineReducers } from 'redux';
import globalState from "./globalState";
import auth from "./auth";
import app from "./app";

export default combineReducers({
    auth,  globalState, app
})
