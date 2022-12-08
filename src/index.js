import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import {PersistGate} from "redux-persist/integration/react";
import configureStore from './store/configureStore';
import {Provider} from "react-redux";
import "./i18n";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {notificate} from "./functions";
const {persistor, store} = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.withCredentials = true;
axios.interceptors.response.use(response => {
    notificate(response?.data, response?.status)
    return response?.data?.data
}, error => {
    notificate(error?.response?.data)
    return error
})
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
