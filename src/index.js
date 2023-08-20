import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/roboto_stylesheet.css';

import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import configureStore from './store/configureStore';
import "./i18n";
import axios from "axios";
import {handleFormatDates, notificate} from "./functions";
import dayjs from "dayjs";
import App from "./App";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
const {persistor, store} = configureStore();
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.withCredentials = true;
axios.interceptors.request.use((request) => {

    request.headers['Local-timezone'] = dayjs.tz.guess()

    return request


})
axios.interceptors.response.use((response) => {
    notificate(response?.data, response?.status)
    let data = response?.data?.data??response?.data;
    data = handleFormatDates(data)

    return data
}, error => {

    notificate(error?.response?.data)
     if(error?.response?.status===401){
         setTimeout(()=>document.location.href='/login',1000)
     }
    return error
})



root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
