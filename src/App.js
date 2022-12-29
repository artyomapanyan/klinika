import './App.css';
import React, {useEffect} from 'react';
import {ConfigProvider} from 'antd';
import en from "antd/locale/en_US";
import ar from "antd/locale/ar_EG";
import {useDispatch, useSelector} from "react-redux";
import "./dist/styles/Styles.sass"
import AppRoutes from "./Components/AppRoutes";
import axios from "axios";
import api from "./Api";


function App() {
    let languageState = useSelector((state) => state?.app?.current_locale);
    let dispatch = useDispatch()
    axios.defaults.headers.common['Accept-Language'] = languageState.includes('en')?'en':'ar'
    useEffect(()=>{
        axios.get(`${api.apiEndpoint}${api.version}/app`).then(response=>{
            dispatch({
                type:'APP',
                payload:response
            })
        })
    },[dispatch])

    return (
        <span className={languageState??'en'}>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ce4e99',
                    color: '#fcfcfc',
                },
            }}
            direction={languageState==='ar' ? "rtl" :"ltr" }
            locale={languageState==='ar'?ar:en}
        >
            <AppRoutes/>
        </ConfigProvider>
        </span>
    );
}

export default App;
