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
    const [loading,setLoading] = useState(true);
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

    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);

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


//eyJjb2RlIjoiNVh3eG13cnBobUJGZ24xS2NJU21hLXEtYVE4VnhrNFQ5cE9XSlo0ZDN4VS40TUhvekR3RVRnVldFV1BNNUk0dGZ4LTd4bU5MeTg5Z2lrQ01BTzl3U0QwIiwic3RhdGUiOiI2YjFiYmYxNC1hNWRiLTQ3OWMtOGYwNS0xMGE1ZDIyOWMzOTAiLCJyZWRpcmVjdF91cmkiOiJodHRwczovL2FjY291bnQuamV0YnJhaW5zLmNvbS9vYXV0aDIvaWRlL2NhbGxiYWNrIn0=
