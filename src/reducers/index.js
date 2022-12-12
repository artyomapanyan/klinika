import { combineReducers } from 'redux';
import globalState from "./globalState";
import languageState from "./languageState";
import auth from "./auth";
import app from "./app";

export default combineReducers({
    auth,  globalState, languageState, app
})
