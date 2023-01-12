import './App.css';
import React, {useEffect, useState} from 'react';
import {ConfigProvider} from 'antd';
import en from "antd/locale/en_US";
import ar from "antd/locale/ar_EG";
import {useDispatch, useSelector} from "react-redux";
import "./dist/styles/Styles.sass"
import AppRoutes from "./Components/AppRoutes";
import axios from "axios";
import api from "./Api";
import i18n from "i18next";


function App() {
    let languageState = useSelector((state) => state?.app?.current_locale??'');
    const [loading,setLoading] = useState(false);
    let dispatch = useDispatch()
    axios.defaults.headers.common['Accept-Language'] = languageState?.includes('en')?'en':'ar'
    useEffect(()=>{
        setLoading(true)
        axios.get(`${api.apiEndpoint}${api.version}/app`).then(response=>{
            i18n.addResources(axios.defaults.headers.common['Accept-Language'],'translation',response.translations)
            setLoading(false)
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
            {loading?null:<AppRoutes/>}
        </ConfigProvider>
        </span>
    );
}

export default App;
