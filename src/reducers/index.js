import { combineReducers } from 'redux';
import globalState from "./globalState";
import auth from "./auth";
import app from "./app";
import publicClinic from "./publicClinic";
import owner from "./owner";
import dashboardMenuState from "./dashboardMenuState";

export default combineReducers({
    auth,  globalState, app, publicClinic, owner, dashboardMenuState
})
