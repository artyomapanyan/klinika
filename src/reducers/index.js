import { combineReducers } from 'redux';
import globalState from "./globalState";
import languageState from "./languageState";

export default combineReducers({
    globalState, languageState
})