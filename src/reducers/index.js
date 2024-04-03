import { combineReducers } from 'redux';
import globalState from "./globalState";
import auth from "./auth";
import app from "./app";
import publicClinic from "./publicClinic";
import owner from "./owner";
import dashboardMenuState from "./dashboardMenuState";
import drCalendarDate from "./drCalendarDate";
import statusCode from "./statusCode";
import moyasarIds from "./moyasarIds";

export default combineReducers({
    auth,  globalState, app, publicClinic, owner, dashboardMenuState, drCalendarDate, statusCode, moyasarIds
})
